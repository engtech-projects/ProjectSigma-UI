<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Employee Name", id: "employee_name" },
    { name: "Designation", id: "designation" },
    { name: "Project/Section", id: "section" },
    { name: "IN (AM)", id: "time_in_am" },
    { name: "OUT (AM)", id: "time_out_am" },
    { name: "IN (PM)", id: "time_in_pm" },
    { name: "OUT (PM)", id: "time_out_pm" },
]
</script>
<template>
    <div
        v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_ATTENDANCELOGMONITORING])"
        class="flex flex-col"
    >
        <LayoutPrint>
            <LayoutLoadingContainer :loading="portalMonitoringReports.isLoading">
                <div class="h-full w-full">
                    <div class="h-full">
                        <table class="printTable table-auto border-collapse border border-gray-500">
                            <thead class="text-blue-600 text-md">
                                <tr>
                                    <th
                                        v-for="header in headers"
                                        :key="header.name+'headerRow'"
                                        class="p-1 border-gray-500 border"
                                        :class="header.style ?? ''"
                                    >
                                        {{ header.name }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="text-sm text-center">
                                <tr v-for="attendanceLog, index in portalMonitoringReports.list" :key="'OvertimeMonitoring' + index" class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ attendanceLog.employee_name }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ attendanceLog.designation }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ attendanceLog.section }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ attendanceLog.time_in_am }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ attendanceLog.time_out_am }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ attendanceLog.time_in_pm }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ attendanceLog.time_out_pm }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </LayoutLoadingContainer>
        </LayoutPrint>
    </div>
</template>
<style scoped>
    .flex-5 {
        flex: 5;
    }
</style>
