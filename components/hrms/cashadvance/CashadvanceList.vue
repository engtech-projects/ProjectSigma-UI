<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { cashadvance, list: cashadvanceList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(cashadvances)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (ovr) => {
    isEdit.value = true
    cashadvance.value = ovr
}

const deleteReq = async (req) => {
    try {
        boardLoading.value = true
        await cashadvances.deleteRequest(req.id)
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
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
    { name: "Employee Name", id: "employee_id" },
    { name: "Designation", id: "designation" },
    { name: "Department", id: "department_id" },
    { name: "Project", id: "project_id" },
    { name: "Amount Requested", id: "amount_requested" },
    { name: "Amount Approved", id: "amount_approved" },
    { name: "Terms", id: "terms_of_cash_advance" },
    { name: "Remarks", id: "remarks" },
    { name: "Released by", id: "released_by" },
]
const actions = {
    edit: true,
    delete: true
}

</script>

<template>
    <LayoutBoards title="Overtime Request List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable :header-columns="headers" :datas="cashadvanceList" :actions="actions" @edit-row="setEdit" @delete-row="deleteReq" />
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
