<script lang="ts" setup>
import {
    useGenerateReportStore,
    OVERTIME_MONITORING,
    SALARY_MONITORING,
    OVERTIME_MONITORING_SUMMARY,
    FAILURE_TO_LOG_MONITORING,
    FAILURE_TO_LOG_MONITORING_SUMMARY,
    LEAVE_MONITORING,
    LEAVE_MONITORING_SUMMARY,
    TRAVEL_ORDER_MONITORING,
    TRAVEL_ORDER_MONITORING_SUMMARY,
    MANPOWER_REQUEST_MONITORING
} from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const compId = useId()
const clearList = () => {
    portalMonitoringReports.value.list = []
}
</script>
<template>
    <div :for="compId" class="flex flex-col justify-center gap-1">
        <span class="text-sm">
            Report Type:
        </span>
        <select
            v-model="portalMonitoringReports.params.report_type"
            class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            @change="clearList"
        >
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_portalmonitoring_overtimemonitoring])"
                :value="OVERTIME_MONITORING"
            >
                Overtime Monitoring
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_portalmonitoring_overtimemonitoringsummary])"
                :value="OVERTIME_MONITORING_SUMMARY"
            >
                Overtime Monitoring Summary
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.hrms_reports_portalmonitoring_salarymonitoring])"
                :value="SALARY_MONITORING"
            >
                Salary Monitoring
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_FAILURETOLOG])"
                :value="FAILURE_TO_LOG_MONITORING"
            >
                Failure To Log Monitoring
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_FAILURETOLOGSUMMARY])"
                :value="FAILURE_TO_LOG_MONITORING_SUMMARY"
            >
                Failure To Log Monitoring Summary
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_LEAVEMONITORING])"
                :value="LEAVE_MONITORING"
            >
                Leave Monitoring
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_LEAVEMONITORINGSUMMARY])"
                :value="LEAVE_MONITORING_SUMMARY"
            >
                Leave Monitoring Summary
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_TRAVELORDERMONITORING])"
                :value="TRAVEL_ORDER_MONITORING"
            >
                Travel Order Monitoring
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_TRAVELORDERMONITORINGSUMMARY])"
                :value="TRAVEL_ORDER_MONITORING_SUMMARY"
            >
                Travel Order Monitoring Summary
            </option>
            <option
                v-if="useCheckAccessibility([AccessibilityTypes.HRMS_REPORTS_PORTALMONITORING_MANPOWERREQUESTMONITORING])"
                :value="MANPOWER_REQUEST_MONITORING"
            >
                Manpower Request Monitoring
            </option>
        </select>
    </div>
</template>
