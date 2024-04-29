<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

const genallowstore = useGenerateAllowanceStore()
const { generateAllowance, list: GAList, isEdit, getParams, pagination, errorMessage, successMessage } = storeToRefs(genallowstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEdit = (genall) => {
    isEdit.value = true
    generateAllowance.value = genall
}

const deleteReq = async (req) => {
    try {
        boardLoading.value = true
        await genAllowances.deleteRequest(req.id)
        snackbar.add({
            type: "success",
            text: genAllowances.successMessage
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
    { name: "Cut-off Start", id: "cutoff_start" },
    { name: "Cut-off End", id: "cutoff_end" },
    { name: "Allowance Date", id: "allowance_date" },
    { name: "Total Day(s)", id: "total_days" },
]
const actions = {
    edit: true,
    delete: true
}

</script>

<template>
    <LayoutBoards title="Generate Allowance List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 p-2">
            <LayoutPsTable :header-columns="headers" :datas="GAList" :actions="actions" @edit-row="setEdit" @delete-row="deleteReq" />
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
