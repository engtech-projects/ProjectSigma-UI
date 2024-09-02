<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { myRequests: List } = storeToRefs(mains)

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const headers = [
    { name: "Item Summary", id: "item_summary" },
    { name: "Active Status", id: "item_profiles.active_status" },
    { name: "Is Approved", id: "item_profiles.is_approved" },
]
const actions = {
    showTable: true,
}

const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="My Requests" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
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
    </LayoutBoards>
</template>
