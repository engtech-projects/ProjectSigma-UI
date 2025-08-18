<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const snackbar = useSnackbar()
const route = useRoute()
const loading = ref(false)
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
        loading.value = true
        await projectStore.viewAttachments(projectId)
        window.open(projectStore.viewAttachments.url, "_blank")
    } catch (err: any) {
        const message =
            err.response?._data?.message ||
            err.message ||
            "Unexpected error occurred"
        snackbar.add({
            type: "error",
            text: message
        })
    } finally {
        loading.value = false
    }
}

</script>

<template>
    <div class="flex flex-row gap-4">
        <button
            class="px-4 py-2 text-md font-medium text-white bg-gray-800 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition-color"
            :disabled="loading"
            @click="viewAttachments"
        >
            <span v-if="loading" class="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4 mr-2" />
            <span>{{ loading ? 'Opening...' : 'View Attachments' }}</span>
        </button>
    </div>
</template>
