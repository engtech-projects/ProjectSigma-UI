<script lang="ts" setup>
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const generateReportstore = useItemProfileStore()
const { exportList } = storeToRefs(generateReportstore)
const compId = useId()
const snackbar = useSnackbar()
const downloadFile = async () => {
    try {
        await generateReportstore.getExportList()
        const a = document.createElement("a")
        a.href = exportList.value.tempFile
        a.target = "_blank"
        a.click()
        snackbar.add({
            type: "success",
            text: exportList.value.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: exportList.value.errorMessage
        })
    }
}
</script>
<template>
    <div :for="compId" class="gap-1 flex items-center">
        <button
            type="button"
            class="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center"
            @click="downloadFile"
        >
            <Icon
                name="mage:file-download-fill"
                class="h-5 w-5 lg:h-5 lg:w-5"
            />
            Export Item List
        </button>
    </div>
</template>
