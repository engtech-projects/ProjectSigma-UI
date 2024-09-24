<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { philhealthRemittanceSummaryList } = storeToRefs(generateReportstore)
const generateReport = async () => {
    try {
        await generateReportstore.getPhilhealthRemittanceSummary()
        snackbar.add({
            type: "success",
            text: philhealthRemittanceSummaryList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: philhealthRemittanceSummaryList.value.errorMessage || "something went wrong."
        })
    }
}

const totalPhilhealthEmployeeRemittance = () => {
    return Object.values(philhealthRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_employee_contribution
    }, 0)
}
const totalPhilhealthEmployerRemittance = () => {
    return Object.values(philhealthRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_employer_contribution
    }, 0)
}
const PhilhealthTotalContribution = () => {
    return Object.values(philhealthRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.total_contribution
    }, 0)
}
const PhilhealthTotalEmployee = () => {
    return Object.values(philhealthRemittanceSummaryList.value.list).reduce((accumulator, current) => {
        return accumulator + current.summary.no_of_employee
    }, 0)
}
watch(() => philhealthRemittanceSummaryList.value.params.month_year, (newValue) => {
    if (newValue) {
        philhealthRemittanceSummaryList.value.params.filter_month = newValue.month + 1
        philhealthRemittanceSummaryList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="PHIC Remittance Summary" :loading="philhealthRemittanceSummaryList.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="philhealthRemittanceSummaryList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="philhealthRemittanceSummaryList.params.cutoff_start" class="w-full" title="Cutoff Start" required />
            <LayoutFormPsDateInput v-model="philhealthRemittanceSummaryList.params.cutoff_end" class="w-full" title="Cutoff End" required />
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
                        PEN: 80-0191406-1-000
                    </span>
                    <span class="text-2xl font-bold text-blue-500">
                        EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                    </span>
                    <span class="text-xl text-blue-500">
                        P-1 POBLACION 8 BUENAVISTA AGUSAN DEL NORTE
                    </span>
                </div>
                <div class="title flex flex-col justify-left gap-8 mb-2">
                    <span class="text-xl text-black text-center">
                        Month of <span class="text-Black font-bold underline">APRIL 2024</span>
                    </span>
                    <span>SUMMARY</span>
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
                                PS
                            </th>
                            <th class="border border-gray-500">
                                ES
                            </th>
                            <th class="border border-gray-500">
                                TOTAL CONTRIBUTION
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="reportData, key, index in philhealthRemittanceSummaryList.list" :key="'sssremittancesummary' + index">
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
                                {{ useFormatCurrency(reportData.summary.total_philhealth) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="border border-gray-500 h-8 px-2 text-sm text-left font-bold">
                                SUB-TOTAL
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center font-bold">
                                {{ PhilhealthTotalEmployee() }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalPhilhealthEmployerRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalPhilhealthEmployeeRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(PhilhealthTotalContribution()) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5" class="border border-gray-500 h-8 px-2 text-sm text-left font-bold">
                                TOTAL AMOUNT DUE
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(PhilhealthTotalContribution()) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <HrmsReportsPreparedByCheckBy />
            </div>
        </LayoutPrint>
    </LayoutBoards>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
