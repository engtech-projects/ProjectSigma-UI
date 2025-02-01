<script lang="ts" setup>
const compId = useId()
const downloadFile = async () => {
    // const blob = await generateReportstore.getExportAdministrativeReport()
    const config = useRuntimeConfig()
    const { token } = useAuth()
    const response = await fetch(config.public.HRMS_API_URL + "/api/administrative-export?report_type=EMPLOYEE MASTERLIST&group_type=All", {
        method: "GET",
        headers: {
            Authorization: token.value + "",
            Accept: "application/json"
        },
    })
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "file.xlsx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
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
