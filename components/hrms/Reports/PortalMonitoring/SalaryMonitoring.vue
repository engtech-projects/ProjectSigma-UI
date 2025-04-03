<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Project Name", id: "project_name" },
    { name: "Project Identifier", id: "project_identifier" },
    { name: "Basic Pay", id: "basic_pay" },
    { name: "Number Of Personnel", id: "number_of_personnel (Basic Pay Charged)" },
    { name: "Overtime Pay", id: "overtime_pay" },
    { name: "Number Of Personnel", id: "number_of_personnel (Overtime Pay Charged)" },
    { name: "Sunday Pay", id: "sunday_pay" },
    { name: "Number Of Personnel", id: "number_of_personnel (Sunday Pay Charged)" },
    { name: "Allowance", id: "allowance_pay" },
    { name: "Number Of Personnel", id: "number_of_personnel (Allowance Charged)" },
    { name: "Special Holiday", id: "special_holiday" },
    { name: "Number Of Personnel", id: "number_of_personnel (Special Holiday Pay Charged)" },
    { name: "Regular Holiday", id: "regular_holiday_pay" },
    { name: "Number Of Personnel", id: "number_of_personnel (Regular Holiday Pay Charged)" },
]
</script>
<template>
    <div
        v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_portalmonitoring_salarymonitoring]) || useCheckAccessibility(['AdminOnly'])"
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
                                <tr v-for="request, index in portalMonitoringReports.list" :key="'OvertimeMonitoring' + index" class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        {{ index + 1 }}
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot class="text-sm text-center">
                                <tr class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        Total Amount
                                    </td>
                                    <td />
                                    <td />
                                    <td class="border border-gray-500 h-8">
                                        Amount
                                    </td>
                                    <td />
                                    <td class="border border-gray-500 h-8">
                                        Amount
                                    </td>
                                    <td />
                                    <td class="border border-gray-500 h-8">
                                        Amount
                                    </td>
                                    <td />
                                    <td class="border border-gray-500 h-8">
                                        Amount
                                    </td>
                                    <td />
                                    <td class="border border-gray-500 h-8">
                                        Amount
                                    </td>
                                    <td />
                                    <td class="border border-gray-500 h-8">
                                        Amount
                                    </td>
                                    <td />
                                </tr>
                                <tr class="h-2">
                                    <td class="border border-gray-500 h-8">
                                        Grand Total Amount
                                    </td>
                                    <td colspan="14" class="border border-gray-500 h-8">
                                        Amount
                                    </td>
                                </tr>
                            </tfoot>
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
