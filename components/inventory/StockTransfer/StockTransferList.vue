<script setup>
import { storeToRefs } from "pinia"
import { useStockTransferStore } from "@/stores/inventory/stocktransfer"

// defineProps({
//     items: {
//         type: Object,
//         required: true,
//     },
// })
const mainStore = useStockTransferStore()
const { stockTransfer } = storeToRefs(mainStore)

const headers = [
    { name: "Reference No.", id: "reference_no" },
    { name: "Quantity", id: "qty" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "item_id" },
    { name: "Condition or Status", id: "condition" },
    { name: "Remarks", id: "remarks" },
]
const actions = {
    showTable: true,
}
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/stock-transfer/request-details",
        query: {
            key: data.id
        },
    })
}
const changePaginate = (newParams) => {
    stockTransfer.value.params.page = newParams.page ?? ""
}
const items = [
    {
        reference_no: "ABC123",
        qty: 10,
        unit: "pcs",
        item_id: "Item-001",
        condition: "Good",
        remarks: "Ready for transfer",
    },
    {
        reference_no: "XYZ456",
        qty: 5,
        unit: "pcs",
        item_id: "Item-002",
        condition: "Damaged",
        remarks: "Needs inspection",
    },
]

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="stockTransfer.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="items"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="stockTransfer.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
