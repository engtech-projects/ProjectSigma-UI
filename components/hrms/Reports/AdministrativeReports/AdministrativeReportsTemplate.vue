<script setup>
import {
    useGenerateReportStore,
    EMPLOYEE_MASTERLIST,
    EMPLOYEE_NEWHIRE,
    EMPLOYEE_TENURESHIP,
    EMPLOYEE_LEAVES,
    EMPLOYEE_ABSENTIES
} from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
watch(administrativeReports.value.params, (newValue, oldValue) => {
    if (newValue !== oldValue) {
        administrativeReports.value.list = []
    }
})
</script>
<template>
    <LayoutBoards title="Administrative Reports">
        <div class="p-2">
            <HrmsReportsAdministrativeReportsAdministrativeHeader />
            <HrmsReportsAdministrativeReportsEmployeeTenureship
                v-show="administrativeReports.params.report_type === EMPLOYEE_TENURESHIP"
            />
            <HrmsReportsAdministrativeReportsEmployeeMasterList
                v-show="administrativeReports.params.report_type === EMPLOYEE_MASTERLIST"
            />
            <HrmsReportsAdministrativeReportsEmployeeNewHire
                v-show="administrativeReports.params.report_type === EMPLOYEE_NEWHIRE"
            />
            <HrmsReportsAdministrativeReportsEmployeeLeaves
                v-show="administrativeReports.params.report_type === EMPLOYEE_LEAVES"
            />
            <HrmsReportsAdministrativeReportsEmployeeAbsenties
                v-show="administrativeReports.params.report_type === EMPLOYEE_ABSENTIES"
            />
        </div>
    </LayoutBoards>
</template>

<style scoped>
    .flex-3 {
        flex: 3;
    }
</style>
