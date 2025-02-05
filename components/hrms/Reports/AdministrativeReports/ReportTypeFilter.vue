<script lang="ts" setup>
import { useGenerateReportStore, EMPLOYEE_MASTERLIST, EMPLOYEE_NEWHIRE, EMPLOYEE_TENURESHIP, EMPLOYEE_LEAVES, EMPLOYEE_ABSENTIES } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
const clearList = () => {
    administrativeReports.value.list = []
}
</script>
<template>
    <div :for="compId" class="flex flex-col justify-center gap-1">
        <span class="text-sm">
            Report Type:
        </span>
        <select
            v-model="administrativeReports.params.report_type"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @change="clearList"
        >
            <option :value="EMPLOYEE_TENURESHIP">
                Employee Tenureship
            </option>
            <option :value="EMPLOYEE_MASTERLIST">
                Employee Masterlist
            </option>
            <option :value="EMPLOYEE_NEWHIRE">
                Employee New Hires
            </option>
            <option :value="EMPLOYEE_LEAVES">
                Employee Leaves
            </option>
            <option :value="EMPLOYEE_ABSENTIES">
                Employee Absenties
            </option>
        </select>
    </div>
</template>
