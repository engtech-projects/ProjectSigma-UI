<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

const overtimes = useOvertimeStore()
const { overtime, list: overtimeList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(overtimes)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (ovr) => {
    isEdit.value = true
    overtime.value = ovr
}

const deleteReq = async (req) => {
    try {
        boardLoading.value = true
        await overtimes.deleteRequest(req.id)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
        })
    } finally {
        boardLoading.value = false
    }
}

const changePaginate = (newParams) => {
    getParams.value.page = newParams.page ?? ""
    // getParams.value.syId = newParams.id ?? ""
    // getParams.value.semId = newParams.semId ?? ""
    // getParams.value.feeType = newParams.feeType ?? ""
    // getParams.value.particularName = newParams.particularName ?? ""
}

const headers = [
    { name: "Project", id: "project_id" },
    // { name: "Employee Name", id: "employee_id" },
    { name: "Requesting Office", id: "department_id" },
    { name: "Date of Overtime", id: "overtime_date" },
    { name: "From", id: "overtime_start_time" },
    { name: "To", id: "overtime_end_time" },
    { name: "Purpose/Reason", id: "reason" },
]
const actions = {
    edit: true,
    delete: true
}

</script>

<template>
    <LayoutBoards title="Overtime Request List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable :header-columns="headers" :datas="overtimeList" :actions="actions" @edit-row="setEdit" @delete-row="deleteReq" />
        </div>
        <div class="flex justify-center mx-auto">
            <CustomPagination :links="pagination" @change-params="changePaginate" />
        </div>
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
