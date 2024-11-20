<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { myApprovals: List } = storeToRefs(mains)

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    navigateTo({
        path: "/inventory/item-profile/new-profile/request-details",
        query: {
            key: data.id
        }
    })
}

const headers = [
    { name: "Item Summary", id: "profile_summary" },
    { name: "Request Status", id: "request_status" },
]

const actions = {
    showTable: true,
}

const changePaginate = (newParams) => {
    List.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="List.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
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
