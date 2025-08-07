<script setup>
import { storeToRefs } from "pinia"
import { useReceivingStore } from "@/stores/inventory/receiving"

defineProps({
    items: {
        type: Object,
        required: true,
    },
})
const mainStore = useReceivingStore()
const { warehouseReceivings } = storeToRefs(mainStore)

const headers = [
    { name: "Reference No.", id: "reference_no" },
    { name: "Warehouse", id: "warehouse" },
    { name: "Transaction Type", id: "transaction_type" },
    { name: "Transaction Date", id: "transaction_date" },
    // { name: "Source PO", id: "metadata.po_id" },
]
const actions = {
    showTable: true,
}
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/material-receiving/request-details",
        query: {
            key: data.id
        },
    })
}
const changePaginate = (newParams) => {
    warehouseReceivings.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="warehouseReceivings.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="warehouseReceivings.list"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="warehouseReceivings.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
