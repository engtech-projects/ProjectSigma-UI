<script setup>
import { storeToRefs } from "pinia"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const mains = useItemProfileStore()
const { myApprovalRequestList: List } = storeToRefs(mains)

const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const headers = [
    { name: "Requested by", id: "requested_by.name" },
    { name: "Requesting Office", id: "department.department_name" },
    { name: "Destination", id: "destination" },
    { name: "Purpose", id: "purpose_of_travel" },
    { name: "Duration", id: "duration_of_travel" },
    { name: "Remarks", id: "remarks" },
]

const actions = {
    showTable: true,
}

</script>

<template>
    <LayoutBoards title="My Approval List" class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="List ?? []"
                @show-table="showInformation"
            />
        </div>
        <HrmsTravelOrderInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
