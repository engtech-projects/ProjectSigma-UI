<script lang="ts" setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
watch(administrativeReports.value.params, async () => {
    await generateReportstore.getAdministrativeReport()
})
</script>
<template>
    <div :for="compId" class="flex flex-row items-center gap-4 mb-4">
        <HrmsReportsAdministrativeReportsReportTypeFilter />
        <HrmsReportsAdministrativeReportsAdministrativeGenerateButton />
    </div>
</template>
