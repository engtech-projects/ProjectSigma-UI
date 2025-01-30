<script lang="ts" setup>
import { useGenerateReportStore } from "@/stores/hrms/reports/generateReport"
const generateReportstore = useGenerateReportStore()
const { administrativeReports } = storeToRefs(generateReportstore)
const compId = useId()
const config = useRuntimeConfig()
</script>
<template>
    <div :for="compId" class="gap-1">
        <a
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
            target="_blank"
            :href="config.public.HRMS_API_URL + '/api/administrative-export?report_type='+ administrativeReports.params.report_type + '&group_type=' + administrativeReports.params.group_type"
        >
            <Icon
                name="mage:file-download-fill"
                class="h-5 w-5 lg:h-5 lg:w-5"
            />
            Excel Export
        </a>
    </div>
</template>
