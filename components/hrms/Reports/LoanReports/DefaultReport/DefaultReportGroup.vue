<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { loanReports } = storeToRefs(generateReportstore)
const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getLoanReport()
        snackbar.add({
            type: "success",
            text: loanReports.value.reportResult.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: loanReports.value.reportResult.errorMessage || "something went wrong."
        })
    }
}
const totalEmployeeAmount = () => {
    return Object.values(loanReports.value.reportResult.list).reduce((accumulator, currentGroup) => {
        return accumulator + currentGroup.summary.overall_total_payments
    }, 0)
}
const totalOverallAmount = () => {
    return Object.values(loanReports.value.reportResult.list).reduce((accumulator, currentGroup) => {
        return accumulator + currentGroup.data.reduce((accumulator, currentEmployee) => {
            return accumulator + currentEmployee.total_payments
        }, 0)
    }, 0)
}
watch(() => loanReports.value.reportResult.params.month_year, (newValue) => {
    if (newValue) {
        loanReports.value.reportResult.params.filter_month = newValue.month + 1
        loanReports.value.reportResult.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards :title="loanReports.reportResult.params.loan_type + ' PAYMENT'" :loading="loanReports.reportResult.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="loanReports.reportResult.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="loanReports.reportResult.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="loanReports.reportResult.params.cutoff_end" class="w-full" title="Payroll End" required />
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Generate Report
            </button>
        </form>
        <LayoutPrint>
            <div class="flex flex-col">
                <HrmsReportsLoanReportsHdmfReportHeader />
                <div class="title flex flex-col justify-center gap-1 mb-12">
                    <span class="text-2xl font-bold text-black text-left">
                        {{ loanReports.reportResult.params.loan_type }} PAYMENT
                    </span>
                    <span class="text-xl text-black text-left">
                        FOR THE APPLICABLE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(loanReports.reportResult.params.filter_month) }} {{ loanReports.reportResult.params.filter_year }}</span>
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
                                NO.
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                FULLNAME
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                PROJECT/OFFICE
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                AMOUNT
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                PROJECT/OFFICE TOTAL
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <template v-for="groupData, groupName, groupIndex in loanReports.reportResult.list" :key="'defaultreportProject' + groupIndex">
                            <tr v-for="employeeData, employeeIndex in groupData.data" :key="'defaultreportProjectEmployee' + employeeIndex" class="h-2">
                                <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                    {{ Object.values(loanReports.reportResult.list).slice(0, groupIndex).reduce((acc, curr) => acc + curr.data.length, 0) + employeeIndex + 1 }}
                                </td>
                                <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                    {{ employeeData.fullname }}
                                </td>
                                <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                    {{ groupName }}
                                </td>
                                <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                    {{ useFormatCurrency(employeeData.total_payments) }}
                                </td>
                                <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                    <template v-if="employeeIndex === groupData.data.length - 1">
                                        {{ useFormatCurrency(groupData.summary.overall_total_payments) }}
                                    </template>
                                </td>
                            </tr>
                        </template>
                        <tr>
                            <td colspan="3" class="border border-gray-500 h-8 px-2 font-bold text-sm text-left">
                                TOTAL AMOUNT DUE
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalEmployeeAmount()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalOverallAmount()) }}
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
