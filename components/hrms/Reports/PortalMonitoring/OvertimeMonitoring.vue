<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Employee Name", id: "employee_name" },
    { name: "Designation", id: "designation" },
    { name: "Section", id: "section" },
    { name: "Date of Overtime", id: "date_of_overtime" },
    { name: "Prepared By", id: "prepared_by" },
    { name: "Request Status", id: "request_status" },
    { name: "No. of days delayed filling", id: "days_delayed_filling" },
    { name: "Date Approved", id: "date_approved" },
    { name: "Approvals", id: "approvals" },
]
</script>
<template>
    <div
        v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_portalmonitoring_overtimemonitoring])"
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
                                <tr v-for="overtimeRequest, index in portalMonitoringReports.list" :key="'OvertimeMonitoring' + index" class="h-2">
                                    <template v-for="dataValue, dataValueIndex in overtimeRequest" :key="'Request' + dataValueIndex">
                                        <td class="border border-gray-500 h-8">
                                            {{ index + 1 }}
                                        </td>
                                        <td class="whitespace-nowrap border border-gray-500 h-8">
                                            {{ dataValue.employee_name }}
                                        </td>
                                        <td class="border border-gray-500 h-8">
                                            {{ dataValue.designation }}
                                        </td>
                                        <td class="border border-gray-500 h-8">
                                            {{ dataValue.section }}
                                        </td>
                                        <td class="border border-gray-500 h-8">
                                            {{ dataValue.date_of_overtime }}
                                        </td>
                                        <td class="border border-gray-500 h-8">
                                            {{ dataValue.prepared_by }}
                                        </td>
                                        <td class="border border-gray-500 h-8">
                                            {{ dataValue.request_status }}
                                        </td>
                                        <td class="border border-gray-500 h-8">
                                            {{ dataValue.days_delayed_filling }}
                                        </td>
                                        <td class="border border-gray-500 h-8">
                                            {{ dataValue.date_approved }}
                                        </td>
                                        <td
                                            class="border border-gray-500 h-8"
                                        >
                                            <p class="whitespace-nowrap text-sm text-center">
                                                {{ dataValue.approvals }}
                                            </p>
                                        </td>
                                    </template>
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
