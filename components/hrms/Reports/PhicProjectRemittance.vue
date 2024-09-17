<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { philhealthGroupRemittance } = storeToRefs(generateReportstore)

const generateReport = () => {
    generateReportstore.getPhilhealthGroupRemitance()
}

watch(() => philhealthGroupRemittance.value.params.month_year, (newValue) => {
    if (newValue) {
        philhealthGroupRemittance.value.params.filter_month = newValue.month + 1
        philhealthGroupRemittance.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="PhilHealth Employee Remittance" :loading="philhealthGroupRemittance.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <HrmsCommonDepartmentProjectSelector
                v-model:select-type="philhealthGroupRemittance.params.charging_type"
                v-model:department-id="philhealthGroupRemittance.params.department_id"
                v-model:project-id="philhealthGroupRemittance.params.project_id"
                title="Filter Department/Project"
            />
            <LayoutFormPsMonthYearInput v-model="philhealthGroupRemittance.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="philhealthGroupRemittance.params.cutoff_start" class="w-full" title="Cutoff Start" required />
            <LayoutFormPsDateInput v-model="philhealthGroupRemittance.params.cutoff_end" class="w-full" title="Cutoff End" required />
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
                        Month of <span class="text-Black font-bold underline">{{ useMonthName(philhealthGroupRemittance.params.filter_month) }} {{ philhealthGroupRemittance.params.filter_year }}</span>
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
                    </tbody>
                </table>
            </div>
        </LayoutPrint>
    </LayoutBoards>
</template>
