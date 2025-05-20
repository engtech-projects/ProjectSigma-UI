<script setup>
const requestItems = ref([
    {
        qty: 10,
        unit: "pcs",
        itemDescription: "Steel Pipe",
        specification: "1 inch diameter, 3m length",
        preferredBrand: "Brand A",
        actualBrand: "",
        unit_price: 0,
        remarks: "",
        selected: false,
    },
    {
        qty: 5,
        unit: "box",
        itemDescription: "Concrete Nails",
        specification: "2 inch",
        preferredBrand: "Brand B",
        actualBrand: "",
        unit_price: 0,
        remarks: "",
        selected: false,
    },
])
const selectAllChecked = ref(false)

const toggleSelectAll = () => {
    requestItems.value.forEach((item) => {
        item.selected = selectAllChecked.value
    })
}

watch(requestItems, (newVal) => {
    selectAllChecked.value = newVal.every(item => item.selected)
}, { deep: true })
</script>

<template>
    <div>
        <div>
            <table class="table-auto w-full border-collapse text-sm">
                <thead class="bg-gray-100 text-center">
                    <tr>
                        <th class="p-2 border">
                            <input
                                v-model="selectAllChecked"
                                type="checkbox"
                                class="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                @change="toggleSelectAll"
                            >
                        </th>
                        <th class="p-2 border">
                            Item Description
                        </th>
                        <th class="p-2 border">
                            Specification
                        </th>
                        <th class="p-2 border">
                            QTY
                        </th>
                        <th class="p-2 border">
                            UOM
                        </th>
                        <th class="p-2 border">
                            Preferred Brand
                        </th>
                        <th class="p-2 border">
                            Actual Brand
                        </th>
                        <th class="p-2 border">
                            Unit Price
                        </th>
                        <th class="p-2 border">
                            Remarks During Canvass
                        </th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(item, index) in requestItems" :key="index" class="border-t">
                        <td class="p-2 border">
                            <input
                                v-model="item.selected"
                                type="checkbox"
                                class="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            >
                        </td>
                        <td class="p-2 border">
                            {{ item.itemDescription }}
                        </td>
                        <td class="p-2 border">
                            {{ item.specification }}
                        </td>
                        <td class="p-2 border">
                            {{ item.qty }}
                        </td>
                        <td class="p-2 border">
                            {{ item.unit }}
                        </td>
                        <td class="p-2 border">
                            {{ item.preferredBrand }}
                        </td>

                        <td class="p-2 border">
                            <input
                                v-model="item.actualBrand"
                                type="text"
                                placeholder="Enter brand"
                                class="w-full px-2 py-1 border rounded text-sm"
                            >
                        </td>
                        <td class="p-2 border">
                            <input
                                v-model.number="item.unit_price"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                class="w-full px-2 py-1 border rounded text-sm"
                            >
                        </td>
                        <td class="p-2 border">
                            <textarea
                                v-model="item.remarks"
                                placeholder="Remarks"
                                class="w-full px-2 py-1 border rounded text-sm resize-none"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

</style>
