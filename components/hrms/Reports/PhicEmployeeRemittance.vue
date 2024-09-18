<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { philhealthEmployeeRemitanceList } = storeToRefs(generateReportstore)
const snackbar = useSnackbar()

const generateReport = async () => {
    try {
        await generateReportstore.getPhilhealthEmployeeRemitance()
        snackbar.add({
            type: "success",
            text: philhealthEmployeeRemitanceList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: philhealthEmployeeRemitanceList.value.errorMessage || "something went wrong."
        })
    }
}

watch(() => philhealthEmployeeRemitanceList.value.params.month_year, (newValue) => {
    if (newValue) {
        philhealthEmployeeRemitanceList.value.params.filter_month = newValue.month + 1
        philhealthEmployeeRemitanceList.value.params.filter_year = newValue.year
    }
})
</script>
<template>
    <LayoutBoards title="PhilHealth Employee Remittance" :loading="philhealthEmployeeRemitanceList.isLoading">
        <form class="md:grid grid-cols-4 gap-4 mt-5 mb-16" @submit.prevent="generateReport">
            <LayoutFormPsMonthYearInput v-model="philhealthEmployeeRemitanceList.params.month_year" class="w-full" title="Month Year" required />
            <LayoutFormPsDateInput v-model="philhealthEmployeeRemitanceList.params.cutoff_start" class="w-full" title="Cutoff Start" required />
            <LayoutFormPsDateInput v-model="philhealthEmployeeRemitanceList.params.cutoff_end" class="w-full" title="Cutoff End" required />
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
                    <span class="text-xl font-bold">
                        PEN: 80-0191406-1-000
                    </span>
                    <span class="text-2xl font-bold">
                        EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                    </span>
                    <span class="text-xl">
                        P-1 POBLACION 8 BUENAVISTA AGUSAN DEL NORTE
                    </span>
                </div>
                <div class="title flex flex-col justify-center gap-1 mb-12">
                    <span class="text-2xl font-bold text-black text-center">
                        PHIC CONTRIBUTION
                    </span>
                    <span class="text-xl text-black text-center">
                        FOR THE MONTH OF <span class="font-bold underline">{{ useMonthName(philhealthEmployeeRemitanceList.params.filter_month) }} {{ philhealthEmployeeRemitanceList.params.filter_year }}</span>
                    </span>
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
                        <tr v-for="reportData, index in philhealthEmployeeRemitanceList.list" :key="'philhealthemployeeremitance' + index" class="h-2">
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
