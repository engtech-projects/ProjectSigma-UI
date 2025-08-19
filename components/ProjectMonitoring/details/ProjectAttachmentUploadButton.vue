<script setup lang="ts">
import { ref } from "vue"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const route = useRoute()
const snackbar = useSnackbar()
const projectStore = useProjectStore()
const loading = ref(false)

const uploadAttachment = async (event: any) => {
    try {
        const projectId = Number(route.query.id || route.params.id)
        if (!projectId || isNaN(projectId)) {
            throw new Error("Project ID not found in the route")
        }
        const input = event.target as HTMLInputElement
        const files = input.files
        if (!files || files.length === 0) {
            throw new Error("No files selected")
        }
        loading.value = true
        const formData = new FormData()
        for (const file of files) {
            formData.append("attachments[]", file)
        }
        await projectStore.uploadAttachments(projectId, formData)
        snackbar.add({
            type: "success",
            text: "File uploaded successfully",
        })
        input.value = ""
        projectStore.attachments.list = []
    } catch (error: any) {
        snackbar.add({
            type: "error",
            text: error.message || "Upload failed",
        })
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-4">
            <div class="border border-gray-300 rounded-lg p-1">
                <label class="block mb-1 text-md font-medium text-black">
                    Upload Attachment
                </label>
                <input
                    ref="fileInput"
                    class="mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    type="file"
                    accept=".doc, .docx, .pdf, .png, .jpeg, .jpg, .csv, .xls, .xlsx, .txt, .zip, .rar, .7z"
                    multiple
                    @change="uploadAttachment"
                >
                <div v-if="loading" class="flex items-center gap-2 mt-2 text-sm text-gray-600">
                    <span class="animate-spin border-2 border-gray-400 border-t-transparent rounded-full w-4 h-4" />
                    Uploading files...
                </div>
            </div>
        </div>
    </div>
</template>
