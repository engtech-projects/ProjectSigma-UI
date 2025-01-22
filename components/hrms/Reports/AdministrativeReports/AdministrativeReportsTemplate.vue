<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReportOption } = storeToRefs(generateReportstore)
</script>
<template>
    <LayoutBoards title="Administrative Reports">
        <div class="flex flex-row gap-4 p-2">
            <div class="w-full">
                <span class="text-lg">
                    Report Type:
                </span>
                <select
                    v-model="administrativeReportOption.report_type"
                    class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="employee-tenureship">
                        Employee Tenureship
                    </option>
                    <option value="employee-masterlist">
                        Employee Masterlist
                    </option>
                    <option value="employee-newhires">
                        Employee New Hires
                    </option>
                </select>
            </div>
        </div>
        <div class="p-2">
            <HrmsReportsAdministrativeReportsEmployeeTenureship
                v-show="administrativeReportOption.report_type === 'employee-tenureship'"
            />
            <HrmsReportsAdministrativeReportsEmployeeMasterList
                v-show="administrativeReportOption.report_type === 'employee-masterlist'"
            />
            <HrmsReportsAdministrativeReportsEmployeeNewHire
                v-show="administrativeReportOption.report_type === 'employee-newhires'"
            />
        </div>
    </LayoutBoards>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
