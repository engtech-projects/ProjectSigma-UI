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
</script>
<template>
    <tr class="border-b-2 border-gray-300">
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap">
            <InventoryBomItemSelector
                v-model="item.item_id"
            />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap">
            <InventoryBomItemUomSelector
                :id="compId"
                v-model="item.uom_id"
                @watch-item="watchUnitChange"
            />
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.unit_price"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.quantity"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            {{ amount ? amount : 0 }}
        </td>
        <td class="flex flex-row justify-center items-center px-2 font-medium text-gray-900 whitespace-nowrap text-center">
            <div class="cancel-control">
                <button
                    type="button"
                    class="text-red-700 font-medium text-lg hover:text-white hover:bg-red-700 px-2 py-2"
                    @click="doRemoveItem(index)"
                >
                    <Icon name="mdi:remove" class="h-5 w-5 lg:h-5 lg:w-5" />
                </button>
            </div>
        </td>
    </tr>
</template>
