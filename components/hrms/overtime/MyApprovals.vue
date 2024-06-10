<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { myApprovalRequestList } = storeToRefs(overtimes)

const headers = [
    { name: "Charged to", id: "charging_name" },
    { name: "Date of Overtime", id: "overtime_date" },
    { name: "From", id: "overtime_start_time" },
    { name: "To", id: "overtime_end_time" },
    { name: "Purpose/Reason", id: "reason" },
]
const actions = {
    showTable: true,
}
const infoModalData = ref(null)
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

</script>

<template>
    <LayoutBoards title="" class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovalRequestList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <HrmsOvertimeInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
        :show-approvals="true"
    />
</template>
