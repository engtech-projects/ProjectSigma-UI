<template>
    <LayoutFormPsButton :button-title="nextStage" @click="updateStage" />
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
    let finalStage = ""
    if (props.stage.toLowerCase() !== useProjectEnums.stages[useProjectEnums.stages.length - 1].toLowerCase()) {
        for (const i in useProjectEnums.stages) {
            if (useProjectEnums.stages[i].toLowerCase() === props.stage.toLowerCase()) {
                finalStage = useProjectEnums.stages[parseInt(i) + 1]
            }
        }
    }
    return finalStage
})
const snackbar = useSnackbar()
const updateStage = async () => {
    try {
        await projectStore.updateProjectStage(projectStore.information.id, nextStage.value)
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
