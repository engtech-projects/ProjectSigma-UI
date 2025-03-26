<script setup>
import {
    useGenerateReportStore,
    OVERTIME_MONITORING
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
    <div class="relative LayoutBoards">
        <div
            class="h-full w-full rounded-lg sm:p-6 md:p-2"
        >
            <h5 class="text-xl font-medium text-gray-900 border-b p-2 mb-4">
                Portal Monitoring Reports
            </h5>
            <div class="h-full p-2">
                <HrmsReportsPortalMonitoringHeader />
                <HrmsReportsPortalMonitoringOvertimeMonitoring
                    v-show="portalMonitoringReports.params.report_type === OVERTIME_MONITORING"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
