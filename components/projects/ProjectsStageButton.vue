<template>
    <LayoutFormPsButton :button-title="'Update Stage to ' + upperFirst(nextStage)" @click="updateStage" />
</template>

<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const props = defineProps({
    stage: {
        type: String,
        default: ""
    }
})
const nextStage = computed(() => {
    const currentIndex = useProjectMarketingStatusEnums.stages.findIndex(
        stage => stage.toLowerCase() === props.stage.toLowerCase()
    )
    const isLastStage = currentIndex === useProjectMarketingStatusEnums.stages.length - 1
    return !isLastStage && currentIndex !== -1 ? useProjectMarketingStatusEnums.stages[currentIndex + 1] : ""
})
const snackbar = useSnackbar()
const emit = defineEmits(["updating-stage", "update-success"])
const updateStage = async () => {
    emit("updating-stage")
    try {
        if (!projectStore.information?.id || !nextStage?.value) {
            throw new Error("Missing project ID or stage value")
        }
        await projectStore.updateProjectStage(projectStore.information.id, nextStage.value)
        if (projectStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: projectStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: projectStore.successMessage
            })
            emit("update-success")
        }
        await projectStore.getProject(projectStore.information.id)
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error instanceof Error ? error.message : String(error)
        })
    } finally {
        projectStore.clearMessages()
    }
}
</script>

<style>

</style>
