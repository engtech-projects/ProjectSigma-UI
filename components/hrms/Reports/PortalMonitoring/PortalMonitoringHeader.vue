<script lang="ts" setup>
import {
    useGenerateReportStore,
    SALARY_MONITORING,
    CATEGORY_FILTER_MONITORING_REPORTS,
    DATE_FILTER_MONITORING_REPORTS
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
                v-show="CATEGORY_FILTER_MONITORING_REPORTS.includes(portalMonitoringReports.params.report_type ?? '')"
                v-model:select-type="portalMonitoringReports.params.group_type"
                v-model:department-id="portalMonitoringReports.params.department_id"
                v-model:project-id="portalMonitoringReports.params.project_id"
                title="Category:"
            />
            <HrmsReportsPortalMonitoringDateFilter
                v-show="DATE_FILTER_MONITORING_REPORTS.includes(portalMonitoringReports.params.report_type ?? '')"
                v-model:date-from="portalMonitoringReports.params.date_from"
                v-model:date-to="portalMonitoringReports.params.date_to"
                title="Date Filter"
            />
            <HrmsReportsPortalMonitoringDepartmentProjectSelector
                v-show="portalMonitoringReports.params.report_type === SALARY_MONITORING"
                v-model:select-type="portalMonitoringReports.params.group_type"
                title="Category:"
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
