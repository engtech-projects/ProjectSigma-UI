<script setup lang="ts">
defineProps({
    index: {
        type: Number,
        required: true,
    }
})
const emit = defineEmits(["removeItem"])
const doRemoveItem = (item:any) => {
    emit("removeItem", item)
}
const item = defineModel("item", { required: true, type: Object, default: null })
const compId = useId()
const amount = computed(() => {
    const total = item.value.unit_price * item.value.quantity
    return total
})

const watchUnitChange = (thisItem:any) => {
    if (item.value.conversion) {
        const baseValue = parseFloat(item.value.quantity) / parseFloat(item.value.conversion)
        item.value.conversion = thisItem.conversion
        item.value.quantity = baseValue * item.value.conversion
    }
    item.value.conversion = thisItem.conversion
}
const handleItemSelected = (selectedItem) => {
    if (selectedItem) {
        item.value.default_uom_name = selectedItem.uom_name
        if (!selectedItem.convertable_units || selectedItem.convertable_units.length === 0) {
            item.value.uom_id = selectedItem.uom
            item.value.conversion = 1
        } else {
            item.value.uom_id = null
            item.value.conversion = null
        }
        item.value.convertable_units = selectedItem.convertable_units || []
    } else {
        item.value.uom_id = null
        item.value.conversion = null
        item.value.convertable_units = []
        item.value.default_uom_name = null
    }
}
const isDisabled = computed(() => {
    return !item.value?.convertable_units || item.value.convertable_units.length === 0
})

</script>
<template>
    <tr class="border-b-2 border-gray-300">
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap">
            <InventoryBomItemSelector
                v-model="item.item_id"
                class="min-w-[200px]"
                @item-selected="handleItemSelected"
            />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap">
            <InventoryBomItemUomSelector
                v-if="!isDisabled"
                :id="compId"
                v-model="item.uom_id"
                :item-id="item.item_id"
                class="min-w-[200px]"
                @watch-item="watchUnitChange"
            />
            <span v-else class="text-sm text-gray-800">
                {{ item.default_uom_name }}
            </span>
        </td>
        <td class="p-2 text-center align-top">
            <input
                :id="compId"
                v-model="item.unit_price"
                type="number"
                class="w-full border border-slate-600 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md px-3 py-2 text-sm"
                required
            >
        </td>
        <td class="p-2 text-center align-top">
            <input
                :id="compId"
                v-model="item.quantity"
                type="number"
                step="any"
                class="w-full border border-slate-600 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-md px-3 py-2 text-sm"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            ₱{{ useFormatCurrency(amount ? amount : 0) }}
        </td>
        <td class="p-2 text-center align-middle">
            <button
                type="button"
                class="rounded-full p-1 bg-transparent hover:bg-red-600 hover:text-white transition duration-150 ease-in-out"
                title="Remove item"
                @click="doRemoveItem(index)"
            >
                <Icon name="mdi:remove" class="h-5 w-5" />
            </button>
        </td>
    </tr>
</template>
