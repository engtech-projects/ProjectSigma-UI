<template>
    <div class="flex flex-col gap-4">
        <ProjectMonitoringMarketingProjectDetails :project-details="projectStore.information" />
    </div>
</template>
<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"

const route = useRoute()
onMounted(async () => {
    const projectId = route.query.id
    const projectStore = useProjectStore()
    const resourceStore = useResourceStore()
    await projectStore.getProject(projectId)
    projectStore.viewState = false
    await resourceStore.getResourceUnits()
})
</script>
