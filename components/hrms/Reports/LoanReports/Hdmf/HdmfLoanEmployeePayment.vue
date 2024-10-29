<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { pagibigEmployeeLoanList } = storeToRefs(generateReportstore)
const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getHdmfEmployeeLoan()
        snackbar.add({
            type: "success",
            text: pagibigEmployeeLoanList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: pagibigEmployeeLoanList.value.errorMessage || "something went wrong."
        })
    }
}
const totalLoansPayments = () => {
    return pagibigEmployeeLoanList.value.list.reduce((accumulator, current) => {
        return accumulator + current.total_amount_payment
    }, 0)
}
watch(() => pagibigEmployeeLoanList.value.params.month_year, (newValue) => {
    if (newValue) {
        pagibigEmployeeLoanList.value.params.filter_month = newValue.month + 1
        pagibigEmployeeLoanList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="HDMF Employee Remittance" :loading="pagibigEmployeeLoanList.isLoading" class="flex flex-col">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="pagibigEmployeeLoanList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="pagibigEmployeeLoanList.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="pagibigEmployeeLoanList.params.cutoff_end" class="w-full" title="Payroll End" required />
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Generate Report
            </button>
        </form>
        <LayoutPrint>
            <div class="header flex flex-col  mb-8">
                <div class="flex gap-4">
                    <span class="text-md flex-1">
                        Employer ID:
                    </span>
                    <span class="text-md font-bold flex-5">
                        80-0191406-1-000
                    </span>
                </div>
                <div class="flex gap-4">
                    <span class="text-md flex-1">
                        Employer Name:
                    </span>
                    <span class="text-md font-bold flex-5">
                        EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                    </span>
                </div>
                <div class="flex gap-4">
                    <span class="text-md flex-1">
                        Address:
                    </span>
                    <span class="text-md font-bold flex-5">
                        P-1 POBLACION 1 BUENAVISTA AGUSAN DEL NORTE
                    </span>
                </div>
                <div class="flex gap-4">
                    <span class="text-md flex-1">
                        Contact No:
                    </span>
                    <span class="text-md font-bold flex-5">
                        09395096694
                    </span>
                </div>
                <div class="flex gap-4">
                    <span class="text-md flex-1">
                        Email Address:
                    </span>
                    <span class="text-md font-bold flex-5 underline">
                        evenparcorporation@gmail.com
                    </span>
                </div>
            </div>
            <div class="title flex flex-col justify-center gap-1 mb-12">
                <span class="text-2xl font-bold text-black text-left">
                    HDMF MPL LOAN PAYMENT
                </span>
                <span class="text-xl text-black text-left">
                    For the applicable month of  <span class="font-bold text-red-600">{{ useMonthName(pagibigEmployeeLoanList.params.filter_month) }} {{ pagibigEmployeeLoanList.params.filter_year }}</span>
                </span>
            </div>
            <table class="printTable border border-gray-500 w-full">
                <thead class="text-md">
                    <tr class="py-4 text-bold">
                        <th class="border border-gray-500">
                            PAGIBIG NO./RTN
                        </th>
                        <th class="border border-gray-500">
                            APPLICATION NO
                        </th>
                        <th class="border border-gray-500">
                            LASTNAME
                        </th>
                        <th class="border border-gray-500">
                            FIRST NAME
                        </th>
                        <th class="border border-gray-500">
                            NAME EXT.
                        </th>
                        <th class="border border-gray-500">
                            MIDDLE NAME
                        </th>
                        <th class="border border-gray-500">
                            LOAN TYPE
                        </th>
                        <th class="border border-gray-500">
                            AMOUNT
                        </th>
                        <th class="border border-gray-500">
                            PERCOV
                        </th>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    <tr v-for="reportData, index in pagibigEmployeeLoanList.list" :key="'pagibigEmployeeLoanList' + index" class="h-2">
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ reportData.pagibig_number }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center text-bold">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm">
                            {{ reportData.employee_familyname }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm">
                            {{ reportData.employee_firstname }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ reportData.employee_suffix }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm">
                            {{ reportData.employee_middlename }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ reportData.employee_loan_type }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ useFormatCurrency(reportData.total_amount_payment) }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ reportData.per_cov }}
                        </td>
                    </tr>
                    <tr class="h-2 font-bold">
                        <td class="border border-gray-500 h-8 px-2 text-sm" colspan="7">
                            TOTAL
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center" colspan="2">
                            {{ useFormatCurrency(totalLoansPayments()) }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <HrmsReportsSignaturesRow>
                <HrmsReportsSignaturesPreparedBy />
                <HrmsReportsSignaturesCertifiedCorrectBy />
                <HrmsReportsSignaturesCheckedBy />
            </HrmsReportsSignaturesRow>
        </LayoutPrint>
    </LayoutBoards>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
