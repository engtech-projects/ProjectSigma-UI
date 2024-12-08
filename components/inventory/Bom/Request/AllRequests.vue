<script setup>
import { storeToRefs } from "pinia"
import { useBOMStore } from "@/stores/inventory/bom"
const BOMStore = useBOMStore()
const { allRequests: List } = storeToRefs(BOMStore)
onMounted(() => {
    if (!List.isLoaded) {
        BOMStore.getAllRequests()
    }
})
const headers = [
    { name: "Item Summary", id: "profile_summary" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
    edit: false,
    delete: false,
}

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/bom/request-details",
        query: {
            key: data.id
        },
    })
}
const changePaginate = (newParams) => {
    List.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="List.isLoading">
        <div class="flex flex-col gap-4 pb-2 text-gray-500 overflow-y-auto p-2">
            <InventoryCommonFormAssignmentFilter v-model="List.params" />
            <InventoryCommonLayoutBOMTable
                :header-columns="headers"
                :actions="actions"
                :datas="List.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="List.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <InventoryItemProfileInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
