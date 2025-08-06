<script lang="ts" setup>
import { useRevisionStore } from "@/stores/project-monitoring/revisions"
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const revisionStore = useRevisionStore()
const snackbar = useSnackbar()
const restoreRevision = async () => {
    try {
        await revisionStore.restoreRevisions()
        snackbar.add({
            type: "success",
            text: revisionStore.successMessage
        })
        projectStore.getProject(revisionStore.getParams.project_id)
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error instanceof Error ? error.message : String(error)
        })
    } finally {
        revisionStore.clearMessages()
        projectStore.clearMessages()
    }
}
</script>
<template>
    <div class="flex items-center justify-between mb-2">
        <label class="text-md font-semibold">
            <Icon name="mdi:folder-information" />
            Project Details
        </label>
        <button
            v-show="revisionStore.revisionSelected !== null"
            class="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm transition"
            @click="restoreRevision"
        >
            Restore Revision
        </button>
    </div>
</template>
