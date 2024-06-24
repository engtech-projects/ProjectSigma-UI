<script  setup>
import { storeToRefs } from "pinia"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const genpayrollstore = useGeneratePayrollStore()
const { payrollRecord, list: payrollList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(genpayrollstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const headers = [
    { name: "Payroll Date", id: "payroll_date" },
    { name: "Charged to", id: "charging_name" },
    { name: "Cut Off End", id: "cutoff_end" },
    { name: "Cut Off Start", id: "cutoff_start" },
    { name: "Payroll Type", id: "payroll_type" },
    { name: "Release Type", id: "release_type" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true, // edit: true, // delete: true
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
const setEdit = (ovr) => {
    isEdit.value = true
    payrollRecord.value = ovr
}
const deleteReq = async (req) => {
    try {
        boardLoading.value = true
        await failtologs.deleteLog(req.id)
        snackbar.add({
            type: "success",
            text: failtologs.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}
const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="payrollList"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteReq"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
        <HrmsPayrollInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
            :show-approvals="false"
        />
        <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
            {{ errorMessage }}
        </p>
        <p
            v-show="successMessage"
            hidden
            class="success-message text-green-600 text-center font-semibold italic"
        >
            {{ successMessage }}
        </p>
    </LayoutBoards>
</template>
