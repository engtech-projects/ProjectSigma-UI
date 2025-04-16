<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Employee Name", id: "employee_name" },
    { name: "Designation", id: "designation" },
    { name: "Section", id: "section" },
    { name: "Date of Failure to Log", id: "date_of_failure_to_log" },
    { name: "Date Filled", id: "date_filled" },
    { name: "Prepared By", id: "prepared_by" },
    { name: "Request Status", id: "request_status" },
    { name: "No. of Days Delayed Filling", id: "no_of_days_delayed_filling" },
    { name: "Date Approved", id: "date_approved" },
    { name: "Approvals", id: "approvals" },
]
</script>
<template>
    <div
        v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_portalmonitoring_failuretologmonitoring] || useCheckAccessibility(['AdminOnly']))"
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
                                <tr v-for="failureToLog, index in portalMonitoringReports.list" :key="'OvertimeMonitoring' + index" class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ failureToLog.employee_name }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ failureToLog.designation }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ failureToLog.section }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ failureToLog.date_of_failure_to_log }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ failureToLog.prepared_by }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ failureToLog.request_status }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ failureToLog.days_delayed_filling }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ failureToLog.date_approved }}
                                    </td>
                                    <td
                                        class="border border-gray-500 h-8"
                                    >
                                        <p class="whitespace-nowrap text-sm text-center">
                                            {{ failureToLog.approvals }}
                                        </p>
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
