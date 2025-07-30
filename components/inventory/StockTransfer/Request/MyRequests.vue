<script setup>
import { storeToRefs } from "pinia"
import { useStockTransferStore } from "@/stores/inventory/stocktransfer"
const mainStore = useStockTransferStore()
const { myRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        mainStore.getMyRequests()
    }
})
const headers = [
    { name: "Reference No", id: "reference_no" },
    { name: "Office/Project", id: "project.project_code" },
    { name: "Project Address", id: "office_project_address" },
    { name: "Date Needed", id: "date_needed" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
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
    myRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
