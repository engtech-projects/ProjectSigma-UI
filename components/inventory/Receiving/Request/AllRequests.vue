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

const headers = [
    { name: "Reference No", id: "reference_no" },
    { name: "Project Code", id: "project.project_code" },
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
    allRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="allRequests.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            {{ allRequest }}
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allRequests.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
