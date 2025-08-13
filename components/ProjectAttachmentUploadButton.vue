<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"

const route = useRoute()
const snackbar = useSnackbar()

const projectStore = useProjectStore()

const uploadAttachment = async (event: any) => {
    try {
        const projectId = Number(route.query?.id)
        if (!projectId) {
            throw new Error("Missing project ID from route")
        }

        const input = event.target as HTMLInputElement
        const files = input.files
        if (!files || files.length === 0) {
            throw new Error("No files selected")
        }
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
    } catch (error: any) {
        snackbar.add({
            type: "error",
            text: error.message || "Upload failed",
        })
    }
}
</script>
<template>
    <div class="flex flex-col gap-4">
        <div class="flex flex-row gap-4 justify-start mt-4">
            <div class="w-full">
                <label class="block mb-1 text-sm font-medium text-gray-900">
                    File
                </label>
                <input
                    class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    type="file"
                    accept=".doc, .docx, .pdf, .png, .jpeg"
                    multiple
                    @change="uploadAttachment"
                >
            </div>
        </div>
    </div>
</template>
