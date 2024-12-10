<script setup>
import { useLoansStore } from "@/stores/hrms/loansAndCash/loans"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const loanStore = useLoansStore()
const employeeStore = useEmployeeInfo()
const { createData } = storeToRefs(loanStore)
const snackbar = useSnackbar()
const employeeSearched = () => {
    createData.value.data.employee_id = employeeStore.information.id
}
const deptProj = computed(() => {
    if (employeeStore.information.current_employment) {
        return employeeStore.information.current_employment.work_location === "Office" ? employeeStore.information.current_employment.department_name : employeeStore.information.current_employment.project_names
    }
})
const position = computed(() => {
    if (employeeStore.information.current_employment) {
        if (employeeStore.information.current_employment.position) {
            return employeeStore.information.current_employment.position.name
        }
    }
    return "NONE"
})
const submitAdd = async () => {
    try {
        await loanStore.createResource()
        snackbar.add({
            type: "success",
            text: createData.value.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "Something went wrong."
        })
    }
}
</script>
<template>
    <LayoutLoadingContainer :loading="createData.isLoading">
        <form class="relative" @submit.prevent="submitAdd">
            <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        for="employee_name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Employee Name
                    </label>
                    <SearchBar @search-changed="employeeSearched" />
                </div>
            </div>
            <div class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label
                        for="department"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Department/Project</label>
                    <label
                        id="departmentproj"
                        class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {{ deptProj || '-' }}
                    </label>
                </div>
                <div>
                    <label
                        for="position"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Position</label>
                    <label
                        id="position"
                        class="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        {{ position }}
                    </label>
                </div>
            </div>
            <div class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <LayoutFormPsTextInput
                    v-model="createData.data.name"
                    title="Loan Name"
                    placeholder="Loan Name"
                    name="loanName"
                    required
                />
                <LayoutFormPsNumberInput
                    v-model="createData.data.amount"
                    title="Amount Loaned"
                    name="loanAmt"
                    required
                />
            </div>
            <div class="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label
                        class="block text-md font-medium text-gray-900 dark:text-white mb-6"
                    >
                        Terms
                    </label>
                    <div class="md:flex gap-6 mt-4">
                        <div class="flex flex-wrap items-center mb-4 gap-3">
                            <input
                                id="terms-weekly"
                                v-model="createData.data.terms_of_payment"
                                type="radio"
                                value="weekly"
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label
                                for="terms-weekly"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Weekly
                            </label>
                        </div>
                        <div class="flex flex-wrap items-center mb-4 gap-3">
                            <input
                                id="termsbimonthly"
                                v-model="createData.data.terms_of_payment"
                                type="radio"
                                value="bimonthly"
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label
                                for="termsbimonthly"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Semi-monthly
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label
                        for="amt"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        <p>Monthly Deduction</p>
                    </label>
                    <input
                        id="amt_deduct"
                        v-model="createData.data.installment_deduction"
                        type="number"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                    <div class="text-xs">
                        Bi-Monthly Deduction: {{ (createData.data.installment_deduction ? (createData.data.installment_deduction/2) : 0) }}
                        <br>
                        Weekly Deduction: {{ (createData.data.installment_deduction ? (createData.data.installment_deduction/4) : 0) }}
                    </div>
                </div>
                <div>
                    <label
                        for="date_fill"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        {{ "Deduction Date Start" }}
                    </label>
                    <input
                        id="date_fill"
                        v-model="createData.data.deduction_date_start"
                        type="date"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                </div>
            </div>
            <div class="max-w-full flex flex-row-reverse mt-5">
                <button
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <Icon
                        name="ic:baseline-add"
                        class="w-4 h-4"
                        fill="currentColor"
                    />
                    Add
                </button>
            </div>
        </form>
    </LayoutLoadingContainer>
</template>
