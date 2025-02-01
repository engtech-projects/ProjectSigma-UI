<script lang="ts" setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
const snackbar = useSnackbar()
const downloadFile = async () => {
    try {
        if (administrativeReports.value.params.report_type !== null) {
            await generateReportstore.getExportAdministrativeReport()
            if (administrativeReports.value.errorMessage !== "" && administrativeReports.value.errorMessage !== null) {
                snackbar.add({
                    type: "error",
                    text: administrativeReports.value.errorMessage
                })
            } else {
                const a = document.createElement("a")
                a.href = administrativeReports.value.tempFile ? administrativeReports.value.tempFile : "#"
                a.target = "_blank"
                a.click()
                snackbar.add({
                    type: "success",
                    text: administrativeReports.value.successMessage
                })
            }
        } else {
            snackbar.add({
                type: "error",
                text: "Kindly select a report type"
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
            class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
            @click="downloadFile"
        >
            <Icon
                name="mage:file-download-fill"
                class="h-5 w-5 lg:h-5 lg:w-5"
            />
            Excel Export
        </button>
    </div>
</template>
