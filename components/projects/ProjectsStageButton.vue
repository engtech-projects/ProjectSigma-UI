<template>
    <button class="bg-teal-500 hover:bg-teal-600 active:bg-teal-700 select-none text-white rounded-lg text-sm w-36 h-10" @click="updateStage">
        {{ nextStage }}
    </button>
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
    if (props.stage.toLowerCase() !== projectStore.stages[projectStore.stages.length - 1].toLowerCase()) {
        for (const i in projectStore.stages) {
            if (projectStore.stages[i].toLowerCase() === props.stage.toLowerCase()) {
                finalStage = projectStore.stages[parseInt(i) + 1]
            }
        }
    }
    return finalStage
})
const boardLoading = ref(false)
const snackbar = useSnackbar()
const updateStage = async () => {
    try {
        boardLoading.value = true
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
        }
    } catch (error) {
        projectStore.errorMessage = error as string
        snackbar.add({
            type: "error",
            text: projectStore.errorMessage
        })
    } finally {
        projectStore.clearMessages()
        boardLoading.value = false
    }
}
</script>

<style>

</style>
