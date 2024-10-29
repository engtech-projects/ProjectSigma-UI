<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { pagibigRemittanceSummaryList } = storeToRefs(generateReportstore)
const generateReport = async () => {
    try {
        await generateReportstore.getPagibigRemittanceSummary()
        snackbar.add({
            type: "success",
            text: pagibigRemittanceSummaryList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: pagibigRemittanceSummaryList.value.errorMessage || "something went wrong."
        })
    }
}

const totalPagibigEmployeeCount = () => {
    return Object.values(pagibigRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.no_of_employee
    }, 0)
}
const totalPagibigEmployeeRemittance = () => {
    return Object.values(pagibigRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_employee_contribution
    }, 0)
}
const totalPagibigEmployerRemittance = () => {
    return Object.values(pagibigRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_employer_contribution
    }, 0)
}
const pagibigTotalContribution = () => {
    return Object.values(pagibigRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_contribution
    }, 0)
}
watch(() => pagibigRemittanceSummaryList.value.params.month_year, (newValue) => {
    if (newValue) {
        pagibigRemittanceSummaryList.value.params.filter_month = newValue.month + 1
        pagibigRemittanceSummaryList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="HDMF Remittance Summary" :loading="pagibigRemittanceSummaryList.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="pagibigRemittanceSummaryList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="pagibigRemittanceSummaryList.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="pagibigRemittanceSummaryList.params.cutoff_end" class="w-full" title="Payroll End" required />
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Generate Report
            </button>
        </form>
        <LayoutPrint>
            <div class="flex flex-col">
                <div class="header flex flex-col  mb-8">
                    <div class="flex gap-4">
                        <span class="text-md flex-1">
                            Employer ID:
                        </span>
                        <span class="text-md font-bold flex-5">
                            209658570002
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
                <div class="title flex flex-col justify-center gap-1">
                    <span class="text-2xl font-bold text-black text-center">
                        HDMF CONTRIBUTION
                    </span>
                    <span class="text-xl text-black text-center">
                        FOR THE APPLICABLE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(pagibigRemittanceSummaryList.params.filter_month) }} {{ pagibigRemittanceSummaryList.params.filter_year }}</span>
                    </span>
                    <span class="font-bold mt-6">SUMMARY</span>
                </div>
                <table class="printTable border border-gray-500 mb-20">
                    <thead class="text-blue-600 text-md">
                        <tr class="py-4">
                            <th class="py-4 border-gray-500">
                                NO.
                            </th>
                            <th class="border border-gray-500">
                                PROJECT ID
                            </th>
                            <th class="border border-gray-500">
                                NUMBER OF EMPLOYEES
                            </th>
                            <th class="border border-gray-500">
                                EE SHARE
                            </th>
                            <th class="border border-gray-500">
                                ER SHARE
                            </th>
                            <th class="border border-gray-500">
                                TOTAL CONTRIBUTION
                            </th>
                            <th class="border border-gray-500">
                                PENALTY
                            </th>
                            <th class="border border-gray-500">
                                TOTAL PAYABLE
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="reportData, key, index in pagibigRemittanceSummaryList.list" :key="'sssremittancesummary' + index">
                            <td class="border border-gray-500 h-8 px-2 text-sm text-left">
                                {{ index + 1 }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-left">
                                {{ key }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ reportData.summary.no_of_employee }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_employer_contribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_employee_contribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_contribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                0.00
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_contribution) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="border border-gray-500 h-8 px-2 text-sm text-center font-bold">
                                TOTAL
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ totalPagibigEmployeeCount() }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalPagibigEmployerRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalPagibigEmployeeRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(pagibigTotalContribution()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(0) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(pagibigTotalContribution()) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <HrmsReportsSignaturesRow>
                    <HrmsReportsSignaturesPreparedBy />
                    <HrmsReportsSignaturesCertifiedCorrectBy />
                    <HrmsReportsSignaturesCheckedBy />
                </HrmsReportsSignaturesRow>
            </div>
        </LayoutPrint>
    </LayoutBoards>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
