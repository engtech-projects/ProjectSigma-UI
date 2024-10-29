<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { sssEmployeeLoanList } = storeToRefs(generateReportstore)
const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getSssEmployeeLoan()
        snackbar.add({
            type: "success",
            text: sssEmployeeLoanList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: sssEmployeeLoanList.value.errorMessage || "something went wrong."
        })
    }
}
const totalLoansPayments = () => {
    return sssEmployeeLoanList.value.list.reduce((accumulator, current) => {
        return accumulator + current.total_amount_payment
    }, 0)
}
watch(() => sssEmployeeLoanList.value.params.month_year, (newValue) => {
    if (newValue) {
        sssEmployeeLoanList.value.params.filter_month = newValue.month + 1
        sssEmployeeLoanList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="HDMF Employee Remittance" :loading="sssEmployeeLoanList.isLoading" class="flex flex-col">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="sssEmployeeLoanList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="sssEmployeeLoanList.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="sssEmployeeLoanList.params.cutoff_end" class="w-full" title="Payroll End" required />
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
                    SSS LOAN PAYMENT
                </span>
                <span class="text-xl text-black text-left">
                    For the applicable month of  <span class="font-bold text-red-600">{{ useMonthName(sssEmployeeLoanList.params.filter_month) }} {{ sssEmployeeLoanList.params.filter_year }}</span>
                </span>
            </div>
            <table class="printTable border border-gray-500 w-full">
                <thead class="text-md">
                    <tr class="py-4">
                        <th class="py-4 border-gray-500">
                            NO.
                        </th>
                        <th class="py-4 border-gray-500">
                            FULLNAME
                        </th>
                        <th class="border border-gray-500">
                            SSS NO.
                        </th>
                        <th class="border border-gray-500">
                            LOAN ACCOUNT NUMBER
                        </th>
                        <th class="border border-gray-500">
                            AMOUNT
                        </th>
                    </tr>
                </thead>
                <tbody class="text-sm">
                    <tr v-for="reportData, index in sssEmployeeLoanList.list" :key="'sssEmployeeLoanList' + index" class="h-2">
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center text-bold">
                            {{ index + 1 }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm">
                            {{ reportData.employee_name }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ reportData.sss_number }}
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            -
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                            {{ useFormatCurrency(reportData.total_amount_payment) }}
                        </td>
                    </tr>
                    <tr class="h-2 font-bold">
                        <td class="border border-gray-500 h-8 px-2 text-sm" colspan="4">
                            TOTAL
                        </td>
                        <td class="border border-gray-500 h-8 px-2 text-sm text-center">
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
