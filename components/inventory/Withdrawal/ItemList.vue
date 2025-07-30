<script setup>
import { storeToRefs } from "pinia"
import { useReceivingStore } from "@/stores/inventory/receiving"

const mainStore = useReceivingStore()
const { allRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!allRequests.isLoaded) {
        mainStore.getAllRequests()
    }
})
const formattedRequests = computed(() => {
    return allRequests.value.list?.flatMap(request =>
        request.items.map(item => ({
            reference_no: request.reference_no,
            project_code: request.project?.project_code || "N/A",
            qty: item.qty,
            transaction_date: request.transaction_date
        }))
    ) ?? []
})

const headers = [
    { name: "Reference No", id: "reference_no" },
    { name: "Project Code", id: "project.project_code" },
    { name: "Quantity", id: "qty" },
    { name: "Transaction Date", id: "transaction_date" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
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
    THIS IS THE materials list
    <LayoutLoadingContainer class="w-full" :loading="receiving.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="formattedRequests"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="receiving.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
