<script setup lang="ts">
import { useLoansStore } from "@/stores/hrms/loansAndCash/loans"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const loanStore = useLoansStore()
const employeeStore = useEmployeeInfo()
const { createData } = storeToRefs(loanStore)
const deptProj = ref(" ")
const position = ref(" ")
const snackbar = useSnackbar()
const utils = useUtilities()
const isLoading = ref(false)
const loanTerms = ref(null)
const employeeSearched = () => {
    deptProj.value = employeeStore.fullname
    position.value = employeeStore.fullname
    loanStore.createData.data.employee_id = employeeStore.information.id
}
const submitAdd = async () => {
    try {
        createData.value.data.no_of_installment = createData.value.data.terms_length
        createData.value.data.period_start = utils.value.dateToString(new Date())
        createData.value.data.period_end = utils.value.addDaysToDate(new Date(), (parseInt(createData.value.data.terms_length) * 30) / parseInt(loanTerms.value))
        isLoading.value = true
        await loanStore.createResource()
        snackbar.add({
            type: "success",
            text: loanStore.createData.successMessage
        })
    } finally {
        isLoading.value = false
    }
}

// const successMessage = computed(() => {
//     return createData.successMessage
// })

</script>
<template>
    <form class="relative" @submit.prevent="submitAdd">
        <AccountingLoadScreen :is-loading="isLoading" />
        <div
            class="relative md:mt-0 edit-item w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto"
        >
            <label for="" class="text-xl font-semibold text-gray-900">
                {{ "Loan Form" }}
            </label>
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
                        {{ deptProj }}
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
                <div>
                    <label
                        class="block text-md font-medium text-gray-900 dark:text-white mb-6"
                    >
                        Terms
                    </label>
                    <div class="md:flex gap-6 mt-4">
                        <div class="flex flex-wrap items-center mb-4 gap-3">
                            <input
                                id="leave-availment-1"
                                v-model="createData.data.terms_of_payment"
                                type="radio"
                                value="monthly"
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label
                                for="leave-availment-1"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Monthly
                            </label>
                        </div>
                        <div class="flex flex-wrap items-center mb-4 gap-3">
                            <input
                                id="leave-availment-1"
                                v-model="createData.data.terms_of_payment"
                                type="radio"
                                value="bimonthly"
                                name="default-radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label
                                for="leave-availment-1"
                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Semi-monthly
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <label
                        class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                    >
                        Term Length
                    </label>
                    <div class="md:flex gap-6 mt-4">
                        <input
                            id="date_fill"
                            v-model="createData.data.terms_length"
                            type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div class="mt-5">
                    <label
                        for="amt"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        <p>Amount To Deduct</p>
                    </label>
                    <input
                        id="amt_deduct"
                        v-model="createData.data.installment_deduction"
                        type="number"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                </div>

                <div class="mt-5">
                    <label
                        for="amt"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Amount Loaned
                    </label>
                    <input
                        id="amt_loaned"
                        v-model="createData.data.amount"
                        type="number"
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
        </div>
    </form>
</template>
