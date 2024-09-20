<script lang="ts" setup>
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"

const salaryDisbursementStore = useSalaryDisbursementStore()
const { createRequestData } = storeToRefs(salaryDisbursementStore)
const showModal = defineModel("showModal", { required: false, type: Boolean })

const snackbar = useSnackbar()

const closeViewModal = () => {
    showModal.value = false
}
const submitRequest = async () => {
    try {
        await salaryDisbursementStore.createRequest()
        snackbar.add({
            type: "success",
            text: "Success created Allowance Request."
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="createRequestData.isLoading" title="Salary Disbursement Request Draft">
        <template #body>
            <HrmsPayrollSalaryDisbursementDetailsTable title="Monthly Payroll Summary" :data="createRequestData.data" />
        </template>
        <template #footer>
            <button
                type="submit"
                class="m-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                @click="submitRequest()"
            >
                Submit
            </button>
        </template>
    </PsModal>
</template>
<style scoped>

</style>
