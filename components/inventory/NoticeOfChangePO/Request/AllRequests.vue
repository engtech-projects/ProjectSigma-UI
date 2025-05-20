<script setup>
import { storeToRefs } from "pinia"
import { ref } from "vue"
import { useNcpoStore } from "@/stores/inventory/procurement/ncpo"

const mainStore = useNcpoStore()
const { allRequests } = storeToRefs(mainStore)
onMounted(() => {
    if (!allRequests.isLoaded) {
        mainStore.getAllRequests()
    }
})
const dummyData = ref([
    {
        id: 1,
        NCPO_NO: "NCPO-001",
        po_number: "PO-001",
        po_date: "2022-01-01",
        project_id: "PRJ-001",
        date: "2022-01-01",
    },
    {
        id: 2,
        NCPO_NO: "NCPO-002",
        po_number: "PO-002",
        po_date: "2022-01-02",
        project_id: "PRJ-002",
        date: "2022-01-02",
    }
])
const headers = [
    { name: "NCPO NO", id: "NCPO_NO" },
    { name: "PO NUMBER", id: "po_number" },
    { name: "PO DATE", id: "po_date" },
    { name: "PROJECT CODE", id: "project_id" },
    { name: "DATE", id: "date" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/procurement/notice-of-change-po/request-details",
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
                :datas="allRequests.list?.length ? allRequests.list : dummyData"
                @show-table="showInformation"
            />
            <!-- :datas="allRequests.list ?? []" -->
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
</template>
