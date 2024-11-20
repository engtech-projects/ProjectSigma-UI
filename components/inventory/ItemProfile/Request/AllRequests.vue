<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { allRequests: List } = storeToRefs(mains)

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
        path: "/inventory/item-profile/new-profile/request-details",
        query: {
            key: data.id
        },
        replace: true
    })
}
const changePaginate = (newParams) => {
    List.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="List.isLoading">
        <div class="pb-2 text-gray-500 overflow-y-auto p-2">
            <LayoutPsTable
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
