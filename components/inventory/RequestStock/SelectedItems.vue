<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    headerColumns: {
        type: Array,
        required: true,
    },
})
const dataColumns = defineModel("dataColumns", { type: Array })
const data = computed(() => dataColumns.value)

const emit = defineEmits(["updateField", "removeItem"])
const compId = useId()

// Function to handle unit changes and track the previous unit
const changeUnit = (index, newUnit) => {
    const item = data.value[index]
    if (!item) { return }

    // Store old unit before changing
    item.old_unit = item.unit

    // Update the unit
    item.unit = newUnit

    // Emit the update to parent
    emit("updateField", index, "unit", newUnit)
    emit("updateField", index, "old_unit", item.old_unit)
}

const convertQuantity = (index, newUnit) => {
    const item = data.value[index]
    if (!item) { return }

    const oldUnit = item.old_unit || item.unit

    // Get initial and target conversion units
    const initialUnit = item.convertable_units.find(u => u.id === oldUnit)
    const selectedUnit = item.convertable_units.find(u => u.id === newUnit)

    // Check if the initial and target conversion units exist
    if (!initialUnit || !selectedUnit) {
        return
    }

    const initialConversion = Number(initialUnit.conversion)
    const newConversion = Number(selectedUnit.conversion)

    // Check validity of conversion rates and item quantity
    if (isNaN(initialConversion) || isNaN(newConversion) || !item.quantity) {
        return
    }

    // Store original quantity
    const originalQuantity = item.quantity

    // Convert quantity using ratio of conversion values
    const newQuantity = Number((useInventoryUomConvertValue(originalQuantity, initialConversion, newConversion)).toFixed(4))
    item.quantity = newQuantity

    // Handle max_quantity conversion or infinite fallback
    const originalMaxQuantity = item.max_quantity

    let newMaxQuantity
    if (originalMaxQuantity == null) { // If max_quantity is undefined or null
        newMaxQuantity = Infinity // Treat as infinite
    } else {
        newMaxQuantity = Number((useInventoryUomConvertValue(originalMaxQuantity, initialConversion, newConversion)).toFixed(2))
    }
    item.max_quantity = newMaxQuantity

    // Emit updates to parent
    emit("updateField", index, "quantity", newQuantity)
    emit("updateField", index, "max_quantity", newMaxQuantity)
}

// Function to change unit and convert quantity
const changeUnitAndConvert = (index, newUnit) => {
    convertQuantity(index, newUnit) // Convert quantity first
    changeUnit(index, newUnit) // Then update the unit
}

</script>

<template>
    <h5 v-if="title" class="text-xl dark:text-white border-b block mb-1 font-medium text-gray-900 bg-teal-200 p-2 sticky top-0 z-50">
        {{ title }}
    </h5>
    <table class="min-w-full table-auto w-full border-collapse">
        <thead>
            <tr>
                <th v-for="header in headerColumns" :key="header.name" class="p-2">
                    {{ header.name }}
                </th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="dataColumns.length === 0">
                <td :colspan="headerColumns.length + 1" class="text-center p-2">
                    NO ITEMS SELECTED
                </td>
            </tr>
            <tr
                v-for="(dataValue, index) in dataColumns"
                :key="dataValue.item_id"
                class="border text-center"
            >
                <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                    <input
                        v-model="dataValue.quantity"
                        type="number"
                        :min="1"
                        :max="dataValue.max_quantity === Infinity ? undefined : dataValue.max_quantity"
                        class="border p-1 w-24 text-center"
                        @input="dataValue.quantity = Math.max(1, Math.min(Number(dataValue.quantity) || 1, dataValue.max_quantity));
                                emit('updateField', index, 'quantity', dataValue.quantity)"
                    >
                </td>
                <td v-if="dataValue.convertable_units.length > 1" colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                    <span
                        class="block w-full cursor-pointer"
                        @click="dataValue.showUomSelector = true"
                    >
                        {{ (dataValue.convertable_units.find(u => u.id === dataValue.unit)?.name || '').toUpperCase() }}
                    </span>
                    <InventoryRequestStockItemUomSelector
                        v-if="dataValue.showUomSelector"
                        :id="compId + index"
                        v-model="dataValue.unit"
                        :item-id="dataValue.item_id"
                        :quantity="dataValue.quantity"
                        :convertable-units="dataValue.convertable_units"
                        @update:model-value="(newUnit) => {
                            changeUnitAndConvert(index, newUnit);
                            dataValue.showUomSelector = false;
                        }"
                        @close="dataValue.showUomSelector = false"
                    />
                </td>
                <td>{{ dataValue.item_summary }}</td>
                <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                    <input
                        v-model="dataValue.specification"
                        type="text"
                        class="border p-1 w-full"
                        @input="emit('updateField', index, 'specification', dataValue.specification)"
                    >
                </td>
                <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                    <input
                        v-model="dataValue.preferred_brand"
                        type="text"
                        class="border p-1 w-full"
                        @input="emit('updateField', index, 'preferred_brand', dataValue.preferred_brand)"
                    >
                </td>
                <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                    <input
                        v-model="dataValue.reason"
                        type="text"
                        class="border p-1 w-full"
                        @input="emit('updateField', index, 'reason', dataValue.reason)"
                    >
                </td>
                <td>
                    <button class="text-red-700 bg-transparent font-medium rounded-lg text-sm py-2.5 me-2 mb-2" @click.prevent="emit('removeItem', index)">
                        <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
