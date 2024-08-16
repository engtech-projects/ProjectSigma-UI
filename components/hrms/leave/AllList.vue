<script setup>
import { storeToRefs } from "pinia"
import { useLeaveRequest } from "~/stores/hrms/leaveRequest"

const leaveRequest = useLeaveRequest()

const { allList, pagination, getParams } = storeToRefs(leaveRequest)
const boardLoading = ref(false)

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
    <LayoutBoards class="w-full" :loading="boardLoading">
        <HrmsCommonSearchEmployeeSelector v-model="getParams.employee_id" />
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allList ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <HrmsLeaveInfoModal
        v-model:showModal="showInformationModal"
        :data="leaveRequestData"
    />
</template>
