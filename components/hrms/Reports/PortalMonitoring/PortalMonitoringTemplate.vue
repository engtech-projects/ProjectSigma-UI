<script setup>
import {
    useGenerateReportStore,
    OVERTIME_MONITORING,
    SALARY_MONITORING,
    OVERTIME_MONITORING_SUMMARY
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
    </LayoutBoardsWithoutBackground>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
