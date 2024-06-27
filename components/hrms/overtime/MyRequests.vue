<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { myRequestList } = storeToRefs(overtimes)

const headers = [
    { name: "Charged to", id: "charging_name" },
    { name: "Date of Overtime", id: "overtime_date" },
    { name: "From", id: "start_time_human" },
    { name: "To", id: "end_time_human" },
    { name: "Purpose/Reason", id: "reason" },
]
const actions = {
    showTable: true,
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const boardLoading = ref(false)

</script>

<template>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequestList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <HrmsOvertimeInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
