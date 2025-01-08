<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { otherDeductionReports } = storeToRefs(generateReportstore)
const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getOtherDeductionReport()
        snackbar.add({
            type: "success",
            text: otherDeductionReports.value.reportResult.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: otherDeductionReports.value.reportResult.errorMessage || "something went wrong."
        })
    }
}
const totalDefaultAmount = () => {
    return otherDeductionReports.value.reportResult.list.reduce((accumulator, current) => {
        return accumulator + current.total_group_amount
    }, 0)
}
watch(() => otherDeductionReports.value.reportResult.params.month_year, (newValue) => {
    if (newValue) {
        otherDeductionReports.value.reportResult.params.filter_month = newValue.month + 1
        otherDeductionReports.value.reportResult.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards :title="otherDeductionReports.reportResult.params.loan_type + ' PAYMENT'" :loading="otherDeductionReports.reportResult.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="otherDeductionReports.reportResult.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="otherDeductionReports.reportResult.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="otherDeductionReports.reportResult.params.cutoff_end" class="w-full" title="Payroll End" required />
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
                        {{ otherDeductionReports.reportResult.params.loan_type }} REPORT (GROUP)
                    </span>
                    <span class="text-xl text-black text-left">
                        FOR THE APPLICABLE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(otherDeductionReports.reportResult.params.filter_month) }} {{ otherDeductionReports.reportResult.params.filter_year }}</span>
                    </span>
                </div>
                <div>
                    <p class="font-bold text-lg">
                        SUMMARY
                    </p>
                </div>
                <table class="printTable border border-gray-500 mb-20">
                    <thead class="text-black text-md">
                        <tr class="py-2">
                            <th rowspan="3" class="border border-gray-500">
                                FULL NAME
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                EMPLOYEE/GROUP
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                AMOUNT
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                TOTAL
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="reportData, index in otherDeductionReports.reportResult.list" :key="'defaultreportgroup' + index" class="h-2">
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ reportData.fullname }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ reportData.payroll_record.charging_name }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ useFormatCurrency(reportData.total_amount) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ useFormatCurrency(reportData.total_group_amount) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="border border-gray-500 h-8 px-2 font-bold text-sm text-left">
                                TOTAL AMOUNT DUE
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalDefaultAmount()) }}
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
