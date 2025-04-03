<script setup lang="ts">
useHead({
    title: "Reports",
    meta: [
        { name: "description", content: "" }
    ],
})
const selectedReport = ref("")
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_reports_group,
        ])"
    >
        <LayoutBoards title="HRMS Reports">
            <template #default>
                <div class="flex gap-4 mt-4 items-center">
                    <div class="text-2xl font-normal mb-4 mt-0">
                        Select Report Type:
                    </div>
                    <select id="report" v-model="selectedReport" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" disabled selected>
                            Select Report
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_sssremittancesummary])"
                            value="Report1"
                        >
                            SSS Remittance Summary
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_sssgroupremittance])"
                            value="Report2"
                        >
                            SSS Group Remittance
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_sssemployeeremittance])"
                            value="Report3"
                        >
                            SSS Employee Remittance
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_philhealthremittancesummary])"
                            value="Report6"
                        >
                            PHIC Remittance Summary
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_philhealthgroupremittance])"
                            value="Report7"
                        >
                            PHIC Group Remittance
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_philhealthemployeeremittance])"
                            value="Report8"
                        >
                            PHIC Employee Remittance
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_pagibigremittancesummary])"
                            value="Report9"
                        >
                            HDMF Remittance Summary
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_pagibiggroupremittance])"
                            value="Report10"
                        >
                            HDMF Group Remittance
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_pagibigemployeeremittance])"
                            value="Report11"
                        >
                            HDMF Employee Remittance
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_loanreports])"
                            value="Report4"
                        >
                            Loan Reports
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_loanreports])"
                            value="Report5"
                        >
                            Other Deductions Reports
                        </option>
                        <option
                            v-if="useCheckAccessibility(['AdminOnly'])"
                            value="Report15"
                        >
                            Salary Monitoring
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_portal_monitoring_overtime_monitoring]) || useCheckAccessibility(['AdminOnly'])"
                            value="Report16"
                        >
                            Portal Monitoring
                        </option>
                        <option
                            v-if="useCheckAccessibility(['AdminOnly'])"
                            value="Report17"
                        >
                            Project Payroll Summary
                        </option>
                        <option
                            v-if="useCheckAccessibility(['AdminOnly'])"
                            value="Report18"
                        >
                            Employee Logs
                        </option>
                        <option
                            v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_administrativereports])"
                            value="Report19"
                        >
                            Administrative Reports
                        </option>
                    </select>
                </div>
                <div class="py-2">
                    <HrmsReportsDisplay :selected-report="selectedReport" />
                </div>
            </template>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
