<script lang="ts" setup>
import {
    useGenerateReportStore,
    EMPLOYEE_MASTERLIST,
    EMPLOYEE_NEWHIRE,
    EMPLOYEE_TENURESHIP,
    EMPLOYEE_LEAVES
} from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
</script>
<template>
    <div :for="compId" class="title flex flex-col justify-center gap-1 mb-12">
        <span v-show="administrativeReports.params.report_type === EMPLOYEE_TENURESHIP" class="text-2xl font-bold text-black text-left">
            Employee Tenureship Report
        </span>
        <span v-show="administrativeReports.params.report_type === EMPLOYEE_MASTERLIST" class="text-2xl font-bold text-black text-left">
            Employee Masterlist Report
        </span>
        <span v-show="administrativeReports.params.report_type === EMPLOYEE_NEWHIRE" class="text-2xl font-bold text-black text-left">
            Employee New Hire Report
        </span>
        <span v-show="administrativeReports.params.report_type === EMPLOYEE_LEAVES" class="text-2xl font-bold text-black text-left">
            Employee Leaves
        </span>
    </div>
</template>
