<script setup>
import { useOtherDeductionStore } from "@/stores/hrms/loansAndCash/otherDeduction"
const otherDeductionStore = useOtherDeductionStore()
const { createData } = storeToRefs(otherDeductionStore)
const snackbar = useSnackbar()
const submitAdd = async () => {
    try {
        await otherDeductionStore.createResource()
        snackbar.add({
            type: "success",
            text: createData.value.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
</script>
<template>
    <form @submit.prevent="submitAdd">
        <AccountingLoadScreen :is-loading="createData.isLoading" />
        <div class="md:mt-0 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
            <label for="" class="text-xl font-semibold text-gray-900">Other Deductions Form</label>
            <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label for="deduction_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deduction Name</label>
                    <input id="deductionName" v-model="createData.data.otherdeduction_name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div>
                    <label
                        for="employee_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Employee Name
                    </label>
                    <HrmsCommonMultipleEmployeeSelector v-model="createData.data.employees" />
                </div>
            </div>
            <div class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label for="amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
                    <input id="amount" v-model="createData.data.amount" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                </div>
                <div>
                    <label for="installment_amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Monthly Deduction</label>
                    <input id="installmentAmount" v-model="createData.data.installment_deduction" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    <div class="text-xs">
                        Bi-Monthly Deduction: {{ (createData.data.installment_deduction ? (createData.data.installment_deduction/2) : 0) }}
                        <br>
                        Weekly Deduction: {{ (createData.data.installment_deduction ? (createData.data.installment_deduction/4) : 0) }}
                    </div>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label for="first_name" class="block mb-2 text-md font-medium text-gray-900 dark:text-white">Terms</label>
                    <div class="md:flex gap-6 mt-4">
                        <div class="flex flex-wrap items-center mb-4 gap-3">
                            <input
                                id="termsMonthly"
                                v-model="createData.data.terms_of_payment"
                                type="radio"
                                value="monthly"
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label for="termsMonthly" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Monthly</label>
                        </div>
                        <div class="flex flex-wrap items-center mb-4 gap-3">
                            <input
                                id="termsBiMonth"
                                v-model="createData.data.terms_of_payment"
                                type="radio"
                                value="bimonthly"
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label for="termsBiMonth" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Semi-monthly</label>
                        </div>
                        <div class="flex flex-wrap items-center mb-4 gap-3">
                            <input
                                id="termsWeekly"
                                v-model="createData.data.terms_of_payment"
                                type="radio"
                                value="weekly"
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label for="termsWeekly" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Weekly</label>
                        </div>
                    </div>
                    <LayoutFormPsDateInput v-model="createData.data.deduction_date_start" title="Deduction Start Date" />
                </div>
            </div>
            <div class="max-w-full flex flex-row-reverse mt-5">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <Icon name="ic:baseline-add" class="w-4 h-4 " fill="currentColor" /> Add
                </button>
            </div>
        </div>
    </form>
</template>
<style scoped>
.customize-table {
    --easy-table-body-row-hover-font-color:none !important;
    --easy-table-body-row-hover-background-color:none !important;
}
#overtime_form .vue3-easy-data-table__footer{
    display: none !important;
}

.add-btn-not-active, .remove-btn-not-active{
    display: none;
}
</style>
