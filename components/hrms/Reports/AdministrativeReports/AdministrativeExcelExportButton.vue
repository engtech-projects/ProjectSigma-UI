<script lang="ts" setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
const downloadFile = async () => {
    await generateReportstore.getExportAdministrativeReport()
    const a = document.createElement("a")
    a.href = administrativeReports.value.tempFile ? administrativeReports.value.tempFile : "#"
    a.target = "_blank"
    a.click()
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
