<script lang="ts" setup>
import { useGenerateReportStore, EMPLOYEE_TENURESHIP, EMPLOYEE_NEWHIRE, EMPLOYEE_LEAVES, EMPLOYEE_MASTERLIST } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
const snackbar = useSnackbar()
const generate = async () => {
    try {
        if (administrativeReports.value.params.report_type === EMPLOYEE_TENURESHIP) {
            await generateReportstore.getAdministrativeReport()
        }
        if (administrativeReports.value.params.report_type === EMPLOYEE_NEWHIRE) {
            await generateReportstore.getAdministrativeReport()
        }
        if (administrativeReports.value.params.report_type === EMPLOYEE_LEAVES) {
            await generateReportstore.getAdministrativeReport()
        }
        if (administrativeReports.value.params.report_type === EMPLOYEE_MASTERLIST) {
            await generateReportstore.getAdministrativeReport()
        }
        if (administrativeReports.value.errorMessage !== "" && administrativeReports.value.errorMessage !== null) {
            snackbar.add({
                type: "error",
                text: administrativeReports.value.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: administrativeReports.value.successMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: administrativeReports.value.errorMessage
        })
    }
}
</script>
<template>
    <div :for="compId" class="gap-1">
        <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
            @click="generate"
        >
            <Icon name="mdi:file-report-outline" color="white" class="w-5 h-5" />
            Generate Report
        </button>
    </div>
</template>
