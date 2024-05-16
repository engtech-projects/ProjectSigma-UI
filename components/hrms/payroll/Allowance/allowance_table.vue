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
        await generateAllowance.deleteRequest(req.id)
        snackbar.add({
            type: "success",
            text: generateAllowance.successMessage
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
    { name: "Charge Department", id: "charge_assignment.department_name" },
    { name: "Cutoff Start", id: "cutoff_start" },
    { name: "Cutoff End", id: "cutoff_end" },
    { name: "Allowance Date", id: "allowance_date" },
    { name: "Allowance Amount", id: "allowance_amount" },
    { name: "Total # of Day(s)", id: "total_days" },
    { name: "Total Amount", id: "total_amount" },

]
// const actions = {
//     edit: true,
//     delete: true
// }

</script>

<template>
    <LayoutBoards title="Generate Allowance List" class="w-full" :loading="boardLoading">
        <!-- <HrmsPayrollAllowanceFilterSelector /> -->
        <div class="pb-2 text-gray-500 p-2">
            <!-- <pre>{{ GAList }}</pre> -->
            <LayoutPsTable :header-columns="headers" :datas="GAList" @edit-row="setEdit" @delete-row="deleteReq" />
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
