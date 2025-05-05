<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Requesting Department", id: "requesting_department" },
    { name: "Requested Position/Title", id: "requested_position" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Age range", id: "age_range" },
    { name: "Civil Status", id: "civil_status" },
    { name: "Gender", id: "gender" },
    { name: "Education Requirement", id: "education_requirement" },
    { name: "Preffered Qualification", id: "preffered_qualification" },
    { name: "Date Required", id: "date_required" },
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
        v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_MANPOWERREQUESTMONITORING])"
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
                                        {{ manpowerRequest.requesting_department }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.requested_position }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.employment_type }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.nature_of_request }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.age_range }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.civil_status }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.gender }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.education_requirement }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.preffered_qualification }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.date_required }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.date_requested }}
                                    </td>
                                    <td class="whitespace-nowrap border border-gray-500 h-8">
                                        {{ manpowerRequest.requested_by }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ manpowerRequest.request_status }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ manpowerRequest.days_delayed_filling }}
                                    </td>
                                    <td class="border border-gray-500 h-8">
                                        {{ manpowerRequest.date_approved }}
                                    </td>
                                    <td
                                        class="border border-gray-500 h-8"
                                    >
                                        <p class="whitespace-nowrap text-sm text-center">
                                            {{ manpowerRequest.approvals }}
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
