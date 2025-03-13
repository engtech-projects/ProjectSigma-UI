<script setup>
defineProps({
    headerColumns: {
        type: Array,
        required: true,
    },
    dataColumns: {
        type: Array,
        required: true,
    },
})

const emit = defineEmits(["updateField", "removeItem"])
const compId = useId()
</script>

<template>
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
                :key="index"
                class="border text-center"
            >
                <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
                    <input
                        v-model="dataValue.quantity"
                        type="number"
                        :min="1"
                        :max="dataValue.max_quantity"
                        class="border p-1 w-16 text-center"
                        @input="emit('updateField', index, 'quantity', Math.max(1, Math.min(dataValue.quantity, dataValue.max_quantity)))"
                    >
                </td>
                <td>
                    <InventoryBomItemUomSelector
                        :id="compId"
                        v-model="dataValue.unit"
                        :item-id="dataValue.item_id"
                        @update:model-value="(newUnit) => {
                            emit('updateField', index, 'unit', newUnit);
                            // Ensure quantity is valid for the new UOM
                            emit('updateField', index, 'quantity', dataValue.quantity || 1);
                        }"
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
                    <button class="text-red-700 bg-transparent font-medium rounded-lg text-sm py-2.5 me-2 mb-2" @click="emit('removeItem', index)">
                        <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
