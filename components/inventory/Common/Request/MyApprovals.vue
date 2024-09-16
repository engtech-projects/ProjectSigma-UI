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

const boardLoading = ref(false)
const actions = {
    showTable: true,
}

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
