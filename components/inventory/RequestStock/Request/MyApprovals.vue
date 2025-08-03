<script setup>
import { storeToRefs } from "pinia"
import { useRequestStockStore } from "@/stores/inventory/requeststock"
const mainStore = useRequestStockStore()
const { myApprovals } = storeToRefs(mainStore)
onMounted(() => {
    if (!myApprovals.value.isLoaded) {
        mainStore.getMyApprovals()
    }
})
const headers = [
    { name: "Reference No", id: "reference_no" },
    { name: "Office/Project", id: "section_type" },
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
        path: "/inventory/requisition-slip/request-details",
        query: {
            key: data.id
        },
    })
}
const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myApprovals.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovals.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="myApprovals.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
