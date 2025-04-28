<script setup>
import { storeToRefs } from "pinia"
import { useCanvassSummaryStore } from "~/stores/inventory/procurement/canvassSummary"

const mainStore = useCanvassSummaryStore()
const { myRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        mainStore.getMyRequests()
    }
})
const headers = [
    { name: "Supplier", id: "supplier_name" },
    { name: "Quotation Date", id: "date" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const dummyData = [
    {
        id: 1,
        supplier_name: "Supplier 4",
        date: "2022-02-26"
    },
    {
        id: 2,
        supplier_name: "Supplier 5",
        date: "2022-02-26"
    },
    {
        id: 3,
        supplier_name: "Supplier 6",
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
    myRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="myRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list?.length ? myRequests.list : dummyData"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
