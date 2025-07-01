<template>
    <div class="flex items-center gap-2">
        <label for="stage">Stage:</label>
        <select id="stage" v-model="selectedStage" class="border p-1 rounded" @change="updateStage">
            <option v-for="stage in stages" :key="stage" :value="stage">
                {{ formatStage(stage) }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useProjectStore } from "~/stores/project-monitoring/projects"

const props = defineProps<{
    projectId: number;
    currentStage: string;
}>()

const selectedStage = ref(props.currentStage)

const stages = ["draft", "proposal", "bidding", "awarded", "archived"]

const projectStore = useProjectStore()

const updateStage = async () => {
    try {
        await projectStore.updateProjectStage(props.projectId, selectedStage.value)
        alert("Stage updated successfully!")
    } catch (e) {
        alert("Failed to update stage.")
    }
}

const formatStage = (stage: string) => {
    return stage.charAt(0).toUpperCase() + stage.slice(1)
}
</script>
