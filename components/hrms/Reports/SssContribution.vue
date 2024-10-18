<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { sssRemittanceSummaryList } = storeToRefs(generateReportstore)

const generateReport = async () => {
    try {
        await generateReportstore.getSssRemittanceSummary()
        snackbar.add({
            type: "success",
            text: sssEmployeeRemitanceList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: sssEmployeeRemitanceList.value.errorMessage || "something went wrong."
        })
    }
}

const totalSssEmployeeRemittance = () => {
    return Object.values(sssRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_employee_contribution + current.summary.total_employee_wisp
    }, 0)
}
const totalSssEmployerRemittance = () => {
    return Object.values(sssRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_employer_contribution + current.summary.total_employer_wisp
    }, 0)
}
const sssTotalContribution = () => {
    return Object.values(sssRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_contribution + current.summary.total_wisp
    }, 0)
}
const totalSssEmployerCompensation = () => {
    return Object.values(sssRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_employer_compensation
    }, 0)
}
const sssTotal = () => {
    return Object.values(sssRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_sss
    }, 0)
}
watch(() => sssRemittanceSummaryList.value.params.month_year, (newValue) => {
    if (newValue) {
        sssRemittanceSummaryList.value.params.filter_month = newValue.month + 1
        sssRemittanceSummaryList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="SSS Remittance Summary" :loading="sssRemittanceSummaryList.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="sssRemittanceSummaryList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="sssRemittanceSummaryList.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="sssRemittanceSummaryList.params.cutoff_end" class="w-full" title="Payroll End" required />
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Generate Report
            </button>
        </form>
        <LayoutPrint>
            <div class="flex flex-col">
                <div class="header flex flex-col gap-1 mb-20">
                    <span class="text-xl font-bold text-blue-500">
                        80-0191406-1-000
                    </span>
                    <span class="text-2xl font-bold text-blue-500">
                        EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                    </span>
                    <span class="text-xl text-blue-500">
                        P-1 POBLACION 8 BUENAVISTA AGUSAN DEL NORTE
                    </span>
                </div>
                <div class="title flex flex-col justify-center gap-1 mb-12">
                    <span class="text-2xl font-bold text-black text-center">
                        SSS CONTRIBUTION
                    </span>
                    <span class="text-xl text-black text-center">
                        FOR THE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(sssRemittanceSummaryList.params.filter_month) }} {{ sssRemittanceSummaryList.params.filter_year }}</span>
                    </span>
                </div>
                <table class="printTable border border-gray-500">
                    <thead class="text-blue-600 text-md">
                        <tr class="py-4">
                            <th rowspan="3" class="py-4 border-gray-500">
                                NO.
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                CHARGING NAME
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                NO. OF EMPLOYEES
                            </th>
                            <th colspan="3" class="border border-gray-500">
                                SS AMOUNT
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                EC AMT (ER)
                            </th>
                        </tr>
                        <tr>
                            <th rowspan="2" class="py-4 border-gray-500">
                                ER
                            </th>
                            <th rowspan="2" class="border border-gray-500">
                                EE
                            </th>
                            <th rowspan="2" class="border border-gray-500">
                                TOTAL CONTRIBUTION
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="reportData, key, index in sssRemittanceSummaryList.list" :key="'sssremittancesummary' + index" class="h-2">
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ index + 1 }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm">
                                {{ key }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ reportData.summary.no_of_employee }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_employer_contribution + reportData.summary.total_employer_wisp) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_employee_contribution + reportData.summary.total_employee_wisp) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_contribution + reportData.summary.total_wisp) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.summary.total_employer_compensation) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="border border-gray-500 h-8 px-2 text-sm text-center font-bold">
                                TOTAL
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalSssEmployerRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalSssEmployeeRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(sssTotalContribution()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalSssEmployerCompensation()) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="6" class="border border-gray-500 h-8 px-2 text-sm text-center font-bold">
                                TOTAL AMOUNT DUE
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(sssTotal()) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <HrmsReportsPreparedByCheckBy />
            </div>
        </LayoutPrint>
    </LayoutBoards>
</template>
