<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { pagibigEmployeeRemitanceList } = storeToRefs(generateReportstore)

const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getPagibigEmployeeRemitance()
        snackbar.add({
            type: "success",
            text: pagibigEmployeeRemitanceList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: pagibigEmployeeRemitanceList.value.errorMessage || "something went wrong."
        })
    }
}
const totalPagibigEmployeeRemittance = () => {
    return pagibigEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.pagibig_employee_contribution
    }, 0)
}
const totalPagibigEmployerRemittance = () => {
    return pagibigEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.pagibig_employer_contribution
    }, 0)
}
const pagibigTotalContribution = () => {
    return pagibigEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.total_contribution
    }, 0)
}
watch(() => pagibigEmployeeRemitanceList.value.params.month_year, (newValue) => {
    if (newValue) {
        pagibigEmployeeRemitanceList.value.params.filter_month = newValue.month + 1
        pagibigEmployeeRemitanceList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="HDMF Employee Remittance" :loading="pagibigEmployeeRemitanceList.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="pagibigEmployeeRemitanceList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="pagibigEmployeeRemitanceList.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="pagibigEmployeeRemitanceList.params.cutoff_end" class="w-full" title="Payroll End" required />
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
                <div class="title flex flex-col justify-center gap-1 mb-12">
                    <span class="text-2xl font-bold text-black text-center">
                        HDMF CONTRIBUTION
                    </span>
                    <span class="text-xl text-black text-center">
                        FOR THE APPLICABLE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(pagibigEmployeeRemitanceList.params.filter_month) }} {{ pagibigEmployeeRemitanceList.params.filter_year }}</span>
                    </span>
                </div>
                <table class="printTable border border-gray-500 = mb-20">
                    <thead class="text-blue-600 text-md">
                        <tr class="py-4">
                            <th class="py-4 border-gray-500 =">
                                NO.
                            </th>
                            <th class="border border-gray-500 =">
                                FULL NAME
                            </th>
                            <th class="border border-gray-500 =">
                                PAG-IBIG ID/RTN
                            </th>
                            <th class="border border-gray-500 =">
                                EE SHARE
                            </th>
                            <th class="border border-gray-500 =">
                                ER SHARE
                            </th>
                            <th class="border border-gray-500 =">
                                TOTAL
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="reportData, index in pagibigEmployeeRemitanceList.list" :key="'pagibigemployeeremitance' + index" class="h-2">
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-center">
                                {{ index + 1 }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm">
                                {{ reportData.employee_name }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-center">
                                {{ reportData.employee_pagibig_id }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.pagibig_employee_contribution) }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.pagibig_employer_contribution) }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.total_contribution) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="border border-gray-500 = h-8 px-2 font-bold text-sm text-left">
                                TOTAL
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalPagibigEmployeeRemittance()) }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalPagibigEmployerRemittance()) }}
                            </td>
                            <td class="border border-gray-500 = h-8 px-2 font-bold text-sm text-right">
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
