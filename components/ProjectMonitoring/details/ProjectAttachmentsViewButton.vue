<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const snackbar = useSnackbar()
const route = useRoute()

const viewAttachments = async () => {
    try {
        const projectId = Number(route.params.id || route.query.id)
        if (!projectId || isNaN(projectId)) {
            throw new Error("Missing or invalid project ID")
        }
        snackbar.add({
            type: "info",
            text: "Preparing attachments viewer..."
        })
        const { url } = await projectStore.viewAttachments(projectId)
        if (!url) {
            throw new Error("Empty viewer URL received")
        }
        window.open(url, "_blank")
    } catch (err: any) {
        snackbar.add({
            type: "error",
            text: err.response?._data?.message || err.message || "Unexpected error occurred"
        })
    }
}
</script>

<template>
    <div class="flex flex-row gap-4 justify-start mt-4">
        <button
            class="px-4 py-2 text-sm font-medium text-black bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            @click="viewAttachments"
        >
            View Attachments
        </button>
    </div>
</template>
