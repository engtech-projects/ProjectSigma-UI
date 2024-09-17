<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { sssGroupRemittance } = storeToRefs(generateReportstore)

const generateReport = () => {
    generateReportstore.getSssGroupRemitance()
}

watch(() => sssGroupRemittance.value.params.month_year, (newValue) => {
    if (newValue) {
        sssGroupRemittance.value.params.filter_month = newValue.month + 1
        sssGroupRemittance.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="SSS Project Remittance" :loading="sssGroupRemittance.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <HrmsCommonDepartmentProjectSelector
                v-model:select-type="sssGroupRemittance.params.charging_type"
                v-model:department-id="sssGroupRemittance.params.department_id"
                v-model:project-id="sssGroupRemittance.params.project_id"
                title="Filter Department/Project"
            />
            <LayoutFormPsMonthYearInput v-model="sssGroupRemittance.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="sssGroupRemittance.params.cutoff_start" class="w-full" title="Cutoff Start" required />
            <LayoutFormPsDateInput v-model="sssGroupRemittance.params.cutoff_end" class="w-full" title="Cutoff End" required />
            <button
                type="submit"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Generate Report
            </button>
        </form>
        <LayoutPrint>
            <div class="flex flex-col">
                <div class="header flex flex-col gap-1 mb-20 px-2">
                    <span class="text-xl font-bold text-blue-600">
                        80-0191406-1-000
                    </span>
                    <span class="text-2xl font-bold text-blue-600">
                        EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                    </span>
                    <span class="text-xl text-black">
                        P-1 POBLACION 8 BUENAVISTA AGUSAN DEL NORTE
                    </span>
                </div>
                <div class="title flex flex-col justify-left gap-8 mb-10">
                    <span class="text-xl text-blue-600 text-center">
                        Month of <span class="text-Black font-bold underline">{{ useMonthName(sssGroupRemittance.params.filter_month) }} {{ sssGroupRemittance.params.filter_year }}</span>
                    </span>
                </div>
                <div class="w-full flex justify-start px-2">
                    <p class="font-bold text-gray-900">
                        {{ sssGroupRemittance.chargingName }}
                    </p>
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
                        <tr v-for="reportData, index in sssGroupRemittance.list ?? []" :key="'sssemployeeremitance' + index" class="h-2">
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
                                {{ useFormatCurrency(reportData.sss_employee_contribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.sss_employer_contribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 text-sm text-right">
                                {{ useFormatCurrency(reportData.total_contribution) }}
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
                                {{ useFormatCurrency(generateReportstore.totalSssProjectRemittance) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(generateReportstore.totalSssEmployerGroupRemittance) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(generateReportstore.sssTotalGroupContribution) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(generateReportstore.totalSssEmployerGroupCompensation) }}
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(generateReportstore.sssGroupTotal) }}
                            </td>
                        </tr>
                        <tr>
                            <td colspan="6" class="border border-gray-500 h-8 px-2 font-bold text-sm text-left">
                                TOTAL AMOUNT DUE
                            </td>
                            <td class="border border-gray-500 h-8 px-2 font-bold text-sm text-right">
                                {{ useFormatCurrency(generateReportstore.totalGroupAmountDue) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="justify-around hidden">
                    <div class="flex flex-col gap-12">
                        <span>PREPARED BY:</span>
                        <div class="flex flex-col gap-1">
                            <span class="font-bold underline">
                                JOMELYN S. SANTILLAN
                            </span>
                            <span>
                                HR SPECIALIST
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-12">
                        <span>CERTIFIED CORRECTED BY</span>
                        <div class="flex flex-col gap-1">
                            <span class="font-bold underline">
                                JERMILY C. MOZO
                            </span>
                            <span>
                                HEAD, HUMAN RESOURCE SECTION
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutPrint>
    </LayoutBoards>
</template>
