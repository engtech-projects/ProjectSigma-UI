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
</script>
<template>
    <tr class="border-b-2 border-gray-300">
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
            <input
                :id="compId"
                v-model="item.unit"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.sku"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.item_description"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.specification"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.preferred_brand"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.reason_for_requests"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
        </td>
        <td colspan="1" class="px-2 py-2 border-0 border-b border-r font-medium text-gray-900 whitespace-nowrap text-center">
            <input
                :id="compId"
                v-model="item.turn_over"
                type="number"
                class="w-full min-w-[120px] border border-slate-600 rounded-md px-3 text-md flex items-center relative cursor-pointer"
                required
            >
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
