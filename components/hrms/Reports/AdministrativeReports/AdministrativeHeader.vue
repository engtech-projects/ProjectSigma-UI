<script lang="ts" setup>
import { useGenerateReportStore, EMPLOYEE_NEWHIRE, EMPLOYEE_LEAVES, EMPLOYEE_ABSENTIES } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
</script>
<template>
    <div :for="compId" class="flex flex-col gap-4 mb-8">
        <div class="flex">
            <HrmsReportsAdministrativeReportsReportTypeFilter />
        </div>
        <div class="flex flex-row items-end gap-4">
            <HrmsReportsAdministrativeReportsAllDepartmentProjectSelector
                v-model:select-type="administrativeReports.params.group_type"
                v-model:department-id="administrativeReports.params.department_id"
                v-model:project-id="administrativeReports.params.project_id"
                title="Category:"
            />
            <div
                v-show="administrativeReports.params.report_type == EMPLOYEE_NEWHIRE ||
                    administrativeReports.params.report_type == EMPLOYEE_LEAVES ||
                    administrativeReports.params.report_type == EMPLOYEE_ABSENTIES"
                class="flex gap-4 flex-col max-w-sm"
            >
                <label class="block text-sm font-medium text-gray-900">Date Filter:</label>
                <div class="flex flex-row gap-4">
                    <div class="flex justify-start items-center gap-2">
                        <label class="block mb-2 text-[12px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                        <input v-model="administrativeReports.params.date_from" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div class="flex justify-start items-center gap-2">
                        <label class="block mb-2 text-[12px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                        <input v-model="administrativeReports.params.date_to" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </div>
            </div>
            <HrmsReportsAdministrativeReportsAdministrativeGenerateButton />
            <HrmsReportsAdministrativeReportsAdministrativeExcelExportButton />
        </div>
    </div>
</template>
