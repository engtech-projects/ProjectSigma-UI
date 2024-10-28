<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { philhealthGroupRemittance } = storeToRefs(generateReportstore)
const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getPhilhealthGroupRemitance()
        snackbar.add({
            type: "success",
            text: philhealthGroupRemittance.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: philhealthGroupRemittance.value.errorMessage || "something went wrong."
        })
    }
}

const totalPhilhealthEmployeeRemittance = () => {
    return Object.values(philhealthGroupRemittance.value.list).reduce((accumulator, current) => {
        return accumulator + (current.philhealth_employee_contribution || 0)
    }, 0)
}
const totalPhilhealthEmployerRemittance = () => {
    return Object.values(philhealthGroupRemittance.value.list).reduce((accumulator, current) => {
        return accumulator + (current.philhealth_employer_contribution || 0)
    }, 0)
}
const PhilhealthTotalContribution = () => {
    return Object.values(philhealthGroupRemittance.value.list).reduce((accumulator, current) => {
        return accumulator + (current.total_contribution || 0)
    }, 0)
}
watch(() => philhealthGroupRemittance.value.params.month_year, (newValue) => {
    if (newValue) {
        philhealthGroupRemittance.value.params.filter_month = newValue.month + 1
        philhealthGroupRemittance.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="PhilHealth Group Remittance" :loading="philhealthGroupRemittance.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <HrmsCommonDepartmentProjectSelector
                v-model:select-type="philhealthGroupRemittance.params.charging_type"
                v-model:department-id="philhealthGroupRemittance.params.department_id"
                v-model:project-id="philhealthGroupRemittance.params.project_id"
                class="p-2"
                title="Charging"
            />
            <LayoutFormPsMonthYearInput v-model="philhealthGroupRemittance.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="philhealthGroupRemittance.params.cutoff_start" class="w-full" title="Payroll Start" required />
            <LayoutFormPsDateInput v-model="philhealthGroupRemittance.params.cutoff_end" class="w-full" title="Payroll End" required />
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
                            018000013165
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
                        PHIC CONTRIBUTION
                    </span>
                    <span class="text-xl text-blue-600 text-center">
                        FOR THE APPLICABLE MONTH OF <span class="text-red-600 font-bold underline">{{ useMonthName(philhealthGroupRemittance.params.filter_month) }} {{ philhealthGroupRemittance.params.filter_year }}</span>
                    </span>
                </div>
                <div class="w-full flex justify-start px-2">
                    <p class="font-bold text-gray-900">
                        {{ philhealthGroupRemittance.chargingName }}
                    </p>
                </div>
                <table class="printTable border border-gray-500">
                    <thead class="text-md">
                        <tr class="py-4">
                            <th class="border border-gray-500">
                                NO.
                            </th>
                            <th class="border border-gray-500">
                                NAME
                            </th>
                            <th class="border border-gray-500">
                                PHIC. NO.
                            </th>
                            <th class="border border-gray-500">
                                PS
                            </th>
                            <th class="border border-gray-500">
                                ES
                            </th>
                            <th class="border border-gray-500">
                                TOTAL
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr v-for="reportData, index in philhealthGroupRemittance.list" :key="'philhealthemployeeremitance' + index" class="h-2">
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ index + 1 }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm">
                                {{ reportData.employee_name }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-center">
                                {{ reportData.employee_philhealth_id }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.philhealth_employee_contribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.philhealth_employer_contribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.total_contribution) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3" class="border border-gray-500 h-8 px-2 text-sm text-left font-bold">
                                SUB-TOTAL
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalPhilhealthEmployeeRemittance()) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right font-bold">
                                {{ useFormatCurrency(totalPhilhealthEmployerRemittance()) }}
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
                <HrmsReportsSignaturesRow>
                    <HrmsReportsSignaturesPreparedBy />
                    <HrmsReportsSignaturesCertifiedCorrectBy />
                    <HrmsReportsSignaturesCheckedBy />
                </HrmsReportsSignaturesRow>
            </div>
        </LayoutPrint>
    </LayoutBoards>
</template>
