<script lang="ts" setup>
import {
    useGenerateReportStore,
    OVERTIME_MONITORING,
    SALARY_MONITORING
} from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { portalMonitoringReports } = storeToRefs(generateReportstore)
const compId = useId()
</script>
<template>
    <div :for="compId" class="flex flex-col gap-4 mb-8">
        <div class="flex">
            <HrmsReportsPortalMonitoringReportTypeFilter />
        </div>
        <div class="flex flex-row gap-4">
            <HrmsReportsPortalMonitoringAllDepartmentProjectSelector
                v-show="portalMonitoringReports.params.report_type === OVERTIME_MONITORING"
                v-model:select-type="portalMonitoringReports.params.group_type"
                v-model:department-id="portalMonitoringReports.params.department_id"
                v-model:project-id="portalMonitoringReports.params.project_id"
                title="Category:"
            />
            <HrmsReportsPortalMonitoringDepartmentProjectSelector
                v-show="portalMonitoringReports.params.report_type === SALARY_MONITORING"
                v-model:select-type="portalMonitoringReports.params.group_type"
                title="Category:"
            />
            <HrmsReportsPortalMonitoringDateFilter
                v-show="portalMonitoringReports.params.report_type === OVERTIME_MONITORING"
                v-model:date-from="portalMonitoringReports.params.date_from"
                v-model:date-to="portalMonitoringReports.params.date_to"
                title="Date Filter"
            />
            <HrmsReportsPortalMonitoringDateFilter
                v-show="portalMonitoringReports.params.report_type === SALARY_MONITORING"
                v-model:date-from="portalMonitoringReports.params.date_from"
                v-model:date-to="portalMonitoringReports.params.date_to"
                title="Payroll Date"
            />
            <HrmsReportsPortalMonitoringExcelExportButton />
            <HrmsReportsPortalMonitoringGenerateButton />
        </div>
    </div>
</template>
