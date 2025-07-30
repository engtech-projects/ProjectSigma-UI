<script setup>
const items = defineModel({ required: true, type: Object })
const selectAllChecked = ref(false)

const toggleSelectAll = () => {
    items.value.forEach((item) => {
        item.selected = selectAllChecked.value
    })
}

watch(items, (newItems) => {
    selectAllChecked.value = newItems.length > 0 && newItems.every(item => item.selected)
}, { deep: true })
</script>

<template>
    <div class="overflow-x-auto rounded-lg shadow-md bg-white">
        <table class="min-w-full text-sm text-left border border-gray-200">
            <thead class="bg-gray-100">
                <tr>
                    <th class="p-3 border-b text-center">
                        <input
                            v-model="selectAllChecked"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            aria-label="Select All Items"
                            @change="toggleSelectAll"
                        >
                    </th>
                    <th class="p-3 border-b font-medium">
                        Item Description
                    </th>
                    <th class="p-3 border-b font-medium">
                        Specification
                    </th>
                    <th class="p-3 border-b font-medium">
                        QTY
                    </th>
                    <th class="p-3 border-b font-medium">
                        UOM
                    </th>
                    <th class="p-3 border-b font-medium">
                        Preferred Brand
                    </th>
                    <th class="p-3 border-b font-medium">
                        Actual Brand
                    </th>
                    <th class="p-3 border-b font-medium">
                        Unit Price
                    </th>
                    <th class="p-3 border-b font-medium">
                        Remarks
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, index) in items"
                    :key="index"
                    :class="[
                        'border-b hover:bg-gray-50 transition',
                        item.selected ? 'bg-blue-50' : 'bg-gray-50/50'
                    ]"
                >
                    <td class="p-2 text-center">
                        <input
                            v-model="item.selected"
                            type="checkbox"
                            class="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            :aria-label="`Select item ${index + 1}`"
                        >
                    </td>
                    <td class="p-2 text-center">
                        {{ item.item_description }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.specification }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.quantity }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.uom }}
                    </td>
                    <td class="p-2 text-center">
                        {{ item.preferred_brand }}
                    </td>

                    <td class="p-2">
                        <LayoutFormPsTextInput
                            v-model="item.actual_brand"
                            :disabled="!item.selected"
                            class="w-full disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                            placeholder="Enter Brand"
                        />
                    </td>
                    <td class="p-2">
                        <LayoutFormPsNumberInput
                            v-model="item.unit_price"
                            :disabled="!item.selected"
                            class="w-full disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                            placeholder="Enter Price"
                        />
                    </td>
                    <td class="p-2">
                        <textarea
                            v-model="item.remarks_during_canvass"
                            placeholder="Remarks"
                            rows="2"
                            :disabled="!item.selected"
                            class="w-full px-3 py-1.5 border border-slate-400 rounded-md text-sm resize-none focus:ring focus:ring-blue-200 focus:outline-none disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
