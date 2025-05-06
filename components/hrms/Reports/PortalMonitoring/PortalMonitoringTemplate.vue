<script setup>
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
    MANPOWER_REQUEST_MONITORING,
    PAN_TERMINATION_MONITORING
} from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
watch(portalMonitoringReports.value.params, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        portalMonitoringReports.value.list = []
    }
})
</script>
<template>
    <LayoutBoardsWithoutBackground title="Portal Monitoring Reports" class="w-full">
        <HrmsReportsPortalMonitoringHeader />
        <HrmsReportsPortalMonitoringOvertimeMonitoring
            v-show="portalMonitoringReports.params.report_type === OVERTIME_MONITORING"
        />
        <HrmsReportsPortalMonitoringSalaryMonitoring
            v-show="portalMonitoringReports.params.report_type === SALARY_MONITORING"
        />
        <HrmsReportsPortalMonitoringOvertimeMonitoringSummary
            v-show="portalMonitoringReports.params.report_type === OVERTIME_MONITORING_SUMMARY"
        />
        <HrmsReportsPortalMonitoringFailureToLogMonitoring
            v-show="portalMonitoringReports.params.report_type === FAILURE_TO_LOG_MONITORING"
        />
        <HrmsReportsPortalMonitoringFailureToLogMonitoringSummary
            v-show="portalMonitoringReports.params.report_type === FAILURE_TO_LOG_MONITORING_SUMMARY"
        />
        <HrmsReportsPortalMonitoringLeaveMonitoring
            v-show="portalMonitoringReports.params.report_type === LEAVE_MONITORING"
        />
        <HrmsReportsPortalMonitoringLeaveMonitoringSummary
            v-show="portalMonitoringReports.params.report_type === LEAVE_MONITORING_SUMMARY"
        />
        <HrmsReportsPortalMonitoringTravelOrderMonitoring
            v-show="portalMonitoringReports.params.report_type === TRAVEL_ORDER_MONITORING"
        />
        <HrmsReportsPortalMonitoringTravelOrderMonitoringSummary
            v-show="portalMonitoringReports.params.report_type === TRAVEL_ORDER_MONITORING_SUMMARY"
        />
        <HrmsReportsPortalMonitoringManpowerRequestMonitoring
            v-show="portalMonitoringReports.params.report_type === MANPOWER_REQUEST_MONITORING"
        />
        <HrmsReportsPortalMonitoringPanTerminationMonitoring
            v-show="portalMonitoringReports.params.report_type === PAN_TERMINATION_MONITORING"
        />
    </LayoutBoardsWithoutBackground>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
