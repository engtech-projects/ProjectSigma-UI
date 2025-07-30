<script setup>
import { storeToRefs } from "pinia"
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"

const failtologs = useFailToLogStore()
const { failtolog, allRequests, isEdit } = storeToRefs(failtologs)

const headers = [
    { name: "Date", id: "date_human" },
    { name: "Time", id: "time_human" },
    { name: "Employee", id: "employee.fullname_last" },
    { name: "Charging", id: "charging_designation" },
    { name: "Log Type", id: "log_type" },
    { name: "Reason", id: "reason" },
]
const actions = {
    showTable: true,
    // edit: true,
    // delete: true
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
const snackbar = useSnackbar()
const boardLoading = ref(false)
const setEdit = (ovr) => {
    isEdit.value = true
    failtolog.value = ovr
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
    allRequests.value.params.page = newParams.page ?? ""
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <HrmsCommonSearchEmployeeSelector v-model="allRequests.params.employee_id" />
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRequests.list"
                :actions="actions"
                @edit-row="setEdit"
                @delete-row="deleteReq"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto">
            <PsCustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
        </div>
        <HrmsAttendanceFailtologInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutBoards>
</template>
