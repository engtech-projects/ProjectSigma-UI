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
        <div
            class="w-full"
        >
            <div class="flex gap-4">
                <div class="text-2xl font-normal mb-4 mt-0  ">
                    Reports
                </div>
                <select id="report" v-model="selectedReport" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="" disabled selected>
                        Select Report
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report1"
                    >
                        SSS Summary
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report2"
                    >
                        SSS Project Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_sssemployeeremittance])"
                        value="Report3"
                    >
                        SSS Employee Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report4"
                    >
                        SSS Loan Payment Summary
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report5"
                    >
                        SSS Loan Payment
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report6"
                    >
                        PHIC Summary
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report7"
                    >
                        PHIC Project Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_philhealthemployeeremittance])"
                        value="Report8"
                    >
                        PHIC Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report9"
                    >
                        HDMF Summary
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report10"
                    >
                        HDMF Project Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_pagibigemployeeremittance])"
                        value="Report11"
                    >
                        HDMF Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report12"
                    >
                        HDMF Loan Summary
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report13"
                    >
                        HDMF Loan Project Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report14"
                    >
                        HDMF Loan Remittance
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report15"
                    >
                        Salary Monitoring
                    </option>
                    <option
                        v-if="useCheckAccessibility(['AdminOnly'])"
                        value="Report16"
                    >
                        Overtime Monitoring
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
                </select>
            </div>
            <hr>
            <div>
                <HrmsReportsDisplay :selected-report="selectedReport" />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
