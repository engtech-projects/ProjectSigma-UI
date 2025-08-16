<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"

const route = useRoute()
const projectStore = useProjectStore()
const resourceStore = useResourceStore()
const projectId = route.query.id
onMounted(async () => {
    await projectStore.getProject(projectId)
    await resourceStore.getResourceUnits()
    if (projectStore.information.stage === useProjectMarketingStatusEnums.stages[useProjectMarketingStatusEnums.stages.length - 1]) {
        projectStore.viewState = true
    }
})
</script>
<template>
    <div class="flex flex-col gap-4">
        <ProjectMonitoringMarketingProjectDetails :project-details="projectStore.information" />
    </div>
</template>
