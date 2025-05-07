<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Employee Name", id: "employee_name" },
    { name: "Current Work Location", id: "current_work_location" },
    { name: "Current Salary Type", id: "current_salary_type" },
    { name: "Old Position", id: "old_position" },
    { name: "New Work Location", id: "new_work_location" },
    { name: "New Salary Type", id: "new_salary_type" },
    { name: "New Position", id: "new_position" },
    { name: "Effectivity Date", id: "effectivity_date" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Requested By", id: "requested_by" },
    { name: "Requested Status", id: "request_status" },
    { name: "No. of Days Delayed Filing", id: "days_delayed_filling" },
    { name: "Date Approved", id: "date_approved" },
    { name: "Approvals", id: "approvals" },
]
</script>
<template>
    <div
        v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_PANTRANSFERMONITORING])"
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
                                <tr v-for="panTransfer, index in portalMonitoringReports.list" :key="'OvertimeMonitoring' + index" class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.employee_name }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.current_work_location }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.current_salary_type }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.old_position }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.new_work_location }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.new_salary_type }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.new_position }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.effectivity_date }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.date_requested }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTransfer.requested_by }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ panTransfer.request_status }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ panTransfer.days_delayed_filling }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ panTransfer.date_approved }}
                                    </td>
                                    <td
                                        class="border border-gray-500 h-8"
                                    >
                                        <p class="whitespace-nowrap text-sm text-center">
                                            {{ panTransfer.approvals }}
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
