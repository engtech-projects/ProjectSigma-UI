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
    { name: "Supplier", id: "supplier_name" },
    { name: "Canvass Date", id: "date" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const dummyData = [
    {
        id: 1,
        supplier_name: "Supplier 1",
        date: "2022-02-26"
    },
    {
        id: 2,
        supplier_name: "Supplier 2",
        date: "2022-02-26"
    },
    {
        id: 3,
        supplier_name: "Supplier 3",
        date: "2022-02-26"
    }
]
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
            {{ allRequest }}
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allRequests.list?.length ? allRequests.list : dummyData"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
