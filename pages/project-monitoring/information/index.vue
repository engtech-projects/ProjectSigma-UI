<template>
    <div class="flex flex-col gap-4">
        <ProjectsDetails :project-details="projectStore.information" />
        <div v-if="projectStore.information.stage.toLowerCase() !== useProjectMarketingStatusEnums.stages[useProjectMarketingStatusEnums.stages.length - 1].toLowerCase()" class="flex justify-end gap-4 items-center pb-6">
            <ProjectsStageButton :stage="projectStore.information.stage" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"

const route = useRoute()
const projectId = route.query.id
const projectStore = useProjectStore()
const resourceStore = useResourceStore()
projectStore.viewState = true
await projectStore.getProject(projectId)
await resourceStore.getResourceUnits()
</script>
