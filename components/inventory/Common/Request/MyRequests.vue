<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { myRequests: List } = storeToRefs(mains)

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

const headers = [
    { name: "Item Summary", id: "profile_summary" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}

const boardLoading = ref(false)

</script>
<template>
    <div class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <InventoryCommonLayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="List.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <InventoryItemProfileInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </div>
</template>
