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
const { receiving } = storeToRefs(mainStore)

const headers = [
    { name: "Reference No.", id: "reference_no" },
    { name: "Supplier", id: "supplier.company_name" },
    { name: "Reference", id: "reference_code" },
    { name: "Terms of Payment", id: "terms_of_payment" },
    { name: "Particulars", id: "particulars" },
    { name: "Transaction Date", id: "transaction_date" },
    { name: "Project Code", id: "project.project_code" },
    { name: "Equipment No.", id: "equipment_no" },
    { name: "Source PO", id: "source_po" },
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
    receiving.value.params.page = newParams.page ?? ""
}

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="receiving.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="items"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="receiving.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
