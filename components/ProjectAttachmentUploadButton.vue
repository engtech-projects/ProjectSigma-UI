<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"

const route = useRoute()
const snackbar = useSnackbar()
const attachments = ref({
    form: {
        attachment_name: "",
        other_type: "",
    },
})

const projectStore = useProjectStore()

const uploadAttachment = async (event: any) => {
    try {
        const projectId = Number(route.query?.id)
        if (!projectId || isNaN(projectId)) {
            throw new Error("Project ID not found in the route")
        }

        const input = event.target as HTMLInputElement
        const file = input.files?.[0]
        if (!file) {
            throw new Error("No file selected")
        }

        const formData = new FormData()
        const files: File[] = [file]
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
            <LayoutFormPsSelect
                v-model="attachments.form.attachment_name"
                :options-list="[
                    'PLANS',
                    'PROGRAM OF WORKS',
                    'CONTRACT AGREEMENT',
                    'PERMIT',
                    'OTHERS'
                ]"
                class="w-full"
                title="Attachment Type"
            />

            <LayoutFormPsTextInput
                v-if="attachments?.form.attachment_name === 'OTHERS'"
                v-model="attachments.form.other_type"
                class="w-full"
                title="File Name"
            />

            <div class="w-full">
                <label class="block mb-1 text-sm font-medium text-gray-900">
                    File
                </label>
                <input
                    class="w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    type="file"
                    accept=".doc, .docx, .pdf, .png, .jpeg"
                    @change="uploadAttachment"
                >
            </div>
        </div>
    </div>
</template>
