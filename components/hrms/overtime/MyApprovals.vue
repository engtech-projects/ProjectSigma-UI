<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { approvalList } = storeToRefs(overtimes)
onMounted(() => {
    if (!approvalList.value.isLoaded) {
        overtimes.getMyApprovalRequests()
    }
})
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
const changePaginate = (newParams) => {
    approvalList.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="approvalList.isLoading">
        <div class="w-full flex gap-2">
            <HrmsCommonSearchEmployeeSelector v-model="approvalList.params.employee_id" class="w-full" />
            <LayoutFormPsDateInput v-model="approvalList.params.date_filter" class="w-full" title="Date Filter" />
        </div>
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="approvalList.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="approvalList.pagination" @change-params="changePaginate" />
        </div>
    </LayoutBoards>
    <HrmsOvertimeInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
