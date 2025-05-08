<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Requested Position/Title", id: "requested_position" },
    { name: "Total Number Requested", id: "total_number_requested" },
    { name: "Request Status", id: "request_status" },
    { name: "Total Number of Unserved", id: "total_number_unserved" },
    { name: "Total Number of Served", id: "total_number_served" },
]
</script>
<template>
    <div
        v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_MANPOWERREQUESTMONITORINGSUMMARY])"
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
                                <tr v-for="manpowerRequest, index in portalMonitoringReports.list" :key="'OvertimeMonitoring' + index" class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        {{ index + 1 }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.requested_position }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.total_number_requested }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.request_status }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.total_number_unserved }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.total_number_served }}
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
