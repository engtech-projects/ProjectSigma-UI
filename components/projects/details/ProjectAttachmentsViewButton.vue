<script setup lang="ts">
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projectStore = useProjectStore()
const snackbar = useSnackbar()
const route = useRoute()

const viewDocumentAttachments = async () => {
    try {
        const projectId = Number(route.params?.id)
        if (!projectId) { throw new Error("Missing project ID") }

        await projectStore.viewDocumentAttachments(projectId)
        snackbar.add({ type: "success", text: "Opening document viewer..." })
    } catch (err: any) {
        snackbar.add({ type: "error", text: err.message || "Failed to open document viewer" })
    }
}
defineExpose({ viewDocumentAttachments })
</script>
