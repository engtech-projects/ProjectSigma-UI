<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { sssEmployeeRemitanceList } = storeToRefs(generateReportstore)
const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getSssEmployeeRemittance()
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
    return sssEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.sss_employee_contribution + current.sss_employee_wisp
    }, 0)
}
const totalSssEmployerRemittance = () => {
    return sssEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.sss_employer_contribution + current.sss_employer_wisp
    }, 0)
}
const sssTotalContribution = () => {
    return sssEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.total_contribution
    }, 0)
}
const totalSssEmployerCompensation = () => {
    return sssEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.sss_employer_compensation
    }, 0)
}
const sssTotal = () => {
    return sssEmployeeRemitanceList.value.list.reduce((accumulator, current) => {
        return accumulator + current.total_sss
    }, 0)
}
watch(() => sssEmployeeRemitanceList.value.params.month_year, (newValue) => {
    if (newValue) {
        sssEmployeeRemitanceList.value.params.filter_month = newValue.month + 1
        sssEmployeeRemitanceList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="SSS Employee Remittance" :loading="sssEmployeeRemitanceList.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="sssEmployeeRemitanceList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="sssEmployeeRemitanceList.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="sssEmployeeRemitanceList.params.cutoff_end" class="w-full" title="Payroll End" required />
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
                    <span class="text-xl font-bold text-black">
                        80-0191406-1-000
                    </span>
                    <span class="text-2xl font-bold text-black">
                        EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                    </span>
                    <span class="text-xl text-black">
                        P-1 POBLACION 8 BUENAVISTA AGUSAN DEL NORTE
                    </span>
                </div>
                <div class="title flex flex-col justify-center gap-1 mb-12">
                    <span class="text-2xl font-bold text-black text-center">
                        SSS REMITTANCE EMPLOYEE
                    </span>
                    <span class="text-xl text-black text-center">
                        Month of <span class="text-Black font-bold underline">{{ useMonthName(sssEmployeeRemitanceList.params.filter_month) }} {{ sssEmployeeRemitanceList.params.filter_year }}</span>
                    </span>
                </div>
                <table class="printTable border border-gray-500 mb-20">
                    <thead class="text-black text-md">
                        <tr class="py-4">
                            <th rowspan="3" class="py-4 border-gray-500">
                                NO.
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                NAME OF EMPLOYEE
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                SSS NO.
                            </th>
                            <th colspan="3" class="border border-gray-500">
                                SSS AMOUNT
                            </th>

                            <th rowspan="3" class="border border-gray-500">
                                EC AMT (ER)
                            </th>
                            <th rowspan="3" class="border border-gray-500">
                                TOTAL
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
                        <tr v-for="reportData, index in sssEmployeeRemitanceList.list" :key="'sssemployeeremitance' + index" class="h-2">
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ index + 1 }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm">
                                {{ reportData.employee_name }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ reportData.employee_sss_id }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.sss_employer_contribution + reportData.sss_employer_wisp) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.sss_employee_contribution + reportData.sss_employee_wisp) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.total_contribution + reportData.total_wisp) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.sss_employer_compensation) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.total_sss) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="border border-gray-500 h-8 px-2 font-bold text-sm text-left">
                                TOTAL
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalSssEmployerRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalSssEmployeeRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(sssTotalContribution()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(totalSssEmployerCompensation()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(sssTotal()) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="7" class="border border-gray-500 h-8 px-2 font-bold text-sm text-left">
                                TOTAL AMOUNT DUE
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(sssTotal()) }}
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
