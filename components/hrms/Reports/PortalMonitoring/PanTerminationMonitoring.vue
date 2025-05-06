<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Employee Name", id: "employee_name" },
    { name: "Designation", id: "designation" },
    { name: "Section", id: "section" },
    { name: "Last Day Worked", id: "last_day_worked" },
    { name: "Termination Type", id: "termination_type" },
    { name: "Termination Reason", id: "termination_reason" },
    { name: "Eligible for re-hire", id: "eligible_for_rehire" },
    { name: "Effectivity Date", id: "effectivity_date" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Requested by", id: "requested_by" },
    { name: "Request Status", id: "request_status" },
    { name: "No. of Days Delayed Filing", id: "days_delayed_filling" },
    { name: "Date Approved", id: "date_approved" },
    { name: "Approvals", id: "approvals" },
]
</script>
<template>
    <div
        v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_PANTERMINATIONMONITORING])"
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
                                <tr v-for="panTermination, index in portalMonitoringReports.list" :key="'PanTerminationMonitoring' + index" class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.employee_name }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.designation }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.section }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.last_day_worked }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.termination_type }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.termination_reason }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.eligible_for_rehire }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.effectivity_date }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ panTermination.requested_by }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ panTermination.request_status }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ panTermination.days_delayed_filling }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ panTermination.date_approved }}
                                    </td>
                                    <td
                                        class="border border-gray-500 h-8"
                                    >
                                        <p class="whitespace-nowrap text-sm text-center">
                                            {{ panTermination.approvals }}
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
