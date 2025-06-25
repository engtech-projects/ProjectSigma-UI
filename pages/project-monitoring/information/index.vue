<template>
    <div class="flex flex-col gap-4">
        <ProjectsDetails :project-details="projectStore.information" />
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
