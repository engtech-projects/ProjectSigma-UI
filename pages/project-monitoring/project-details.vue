<script setup>
import { useTaskStore } from "~/stores/project-monitoring/task"
import { useProjectStore } from "~/stores/project-monitoring/projects"
import { useResourceStore } from "~/stores/project-monitoring/resource"
const route = useRoute()
const taskStore = useTaskStore()
const projectStore = useProjectStore()
const resourceStore = useResourceStore()
await taskStore.getTask(route.query.id)
await projectStore.getProject(route.query.pid)
await resourceStore.getResourceNames()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_PROJECTS,
        ])"
    >
        <div class="flex flex-col gap-4 bg-white">
            <ProjectsDetails />
        </div>
    </LayoutAcessContainer>
</template>
