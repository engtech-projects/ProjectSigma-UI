<script lang="ts" setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"

const route = useRoute()
const projectStore = useProjectStore()
const resourceStore = useResourceStore()
projectStore.viewState = false
const projectId = route.query.id
onMounted(async () => {
    await projectStore.getProject(projectId)
    await resourceStore.getResourceUnits()
})
</script>
<template>
    <div class="flex flex-col gap-4">
        <ProjectMonitoringMarketingProjectDetails :project-details="projectStore.information" />
    </div>
</template>
