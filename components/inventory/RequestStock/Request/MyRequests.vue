<script setup>
import { storeToRefs } from "pinia"
import { useRequestStockStore } from "@/stores/inventory/requeststock"
const mainStore = useRequestStockStore()
const { myRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        mainStore.getMyRequests()
    }
})
const headers = [
    { name: "Office/Project", id: "office_project" },
    { name: "Project Address", id: "project_address" },
    { name: "Date Needed", id: "date_needed" },
    { name: "Deliver To", id: "deliver_to" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/suppliers/request-details",
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
            <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
