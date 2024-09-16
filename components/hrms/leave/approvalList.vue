<script setup>
import { storeToRefs } from "pinia"
import { useLeaveRequest } from "~/stores/hrms/leaveRequest"

const leaveRequest = useLeaveRequest()
const { approvalList } = storeToRefs(leaveRequest)
const leaveRequestData = ref(null)
const showInformationModal = ref(false)
const showInformation = (data) => {
    leaveRequestData.value = data
    showInformationModal.value = true
}
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
const headers = [
    { name: "EMPLOYEE NAME", id: "employee.fullname_last" },
    { name: "LEAVE AVAILMENT", id: "leave" },
    { name: "DATE FROM ", id: "date_of_absence_from" },
    { name: "DATE TO ", id: "date_of_absence_to" },
    { name: "REASONS", id: "reason_for_absence" },
    { name: "WITH PAY", id: "with_pay" },
    { name: "LEAVE STATUS", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="approvalList.isLoading">
        <div class="flex gap-2">
            <HrmsCommonSearchEmployeeSelector v-model="approvalList.params.employee_id" class="w-full" />
            <LayoutFormPsDateInput v-model="approvalList.params.date_filter" class="w-full" title="Date Filter" />
        </div>
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="approvalList.list"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="approvalList.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <HrmsLeaveInfoModal
        v-model:showModal="showInformationModal"
        :data="leaveRequestData"
    />
</template>
