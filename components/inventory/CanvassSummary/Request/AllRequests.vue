<script setup>
import { storeToRefs } from "pinia"
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"
const mainStore = useCanvassSummaryStore()
const { allRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!allRequests.isLoaded) {
        mainStore.getAllRequests()
    }
})
const headers = [
    { name: "Terms of Payment", id: "terms_of_payment" },
    { name: "Availability", id: "availability" },
    { name: "Delivery Terms", id: "delivery_terms" },
    { name: "Created At", id: "created_at_human" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/procurement/canvass-summary/request-details",
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
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allRequests.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
