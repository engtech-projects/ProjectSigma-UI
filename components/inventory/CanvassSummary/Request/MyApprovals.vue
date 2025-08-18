<script setup>
import { storeToRefs } from "pinia"
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"
const mainStore = useCanvassSummaryStore()
const { myApprovals } = storeToRefs(mainStore)
onMounted(() => {
    if (!myApprovals.value.isLoaded) {
        mainStore.getMyApprovals()
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
        }
    })
}
const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myApprovals.isLoading">
        <div class="flex flex-col gap-4 pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
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
