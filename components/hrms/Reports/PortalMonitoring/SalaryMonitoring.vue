<script setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const headers = [
    { name: "NO", id: "" },
    { name: "Project Name", id: "project_name" },
    { name: "Project Identifier", id: "project_identifier" },
    { name: "Basic Pay", id: "pay_basic" },
    { name: "Number Of Personnel  (Basic Pay Charged)", id: "number_of_personnel_basic_pay" },
    { name: "Overtime Pay", id: "pay_overtime" },
    { name: "Number Of Personnel (Overtime Pay Charged)", id: "number_of_personnel_overtime_pay" },
    { name: "Sunday Pay", id: "pay_sunday" },
    { name: "Number Of Personnel (Sunday Pay Charged)", id: "number_of_personnel_sunday_pay" },
    { name: "Allowance", id: "pay_allowance" },
    { name: "Number Of Personnel (Allowance Charged)", id: "number_of_personnel_allowance_pay" },
    { name: "Special Holiday", id: "pay_special_holiday" },
    { name: "Number Of Personnel (Special Holiday Pay Charged)", id: "number_of_personnel_special_holiday" },
    { name: "Regular Holiday", id: "pay_regular_holiday_pay" },
    { name: "Number Of Personnel (Regular Holiday Pay Charged)", id: "number_of_personnel_regular_holiday_pay" },
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
