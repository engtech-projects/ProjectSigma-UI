<script setup>
import { useTaskStore } from "~/stores/project-monitoring/task"
import { useResourceStore } from "~/stores/project-monitoring/resource"
import { useProjectStore } from "~/stores/project-monitoring/projects"
const route = useRoute()
const taskStore = useTaskStore()
const resourceStore = useResourceStore()
const projectStore = useProjectStore()
await taskStore.getTask(route.query.id)
await resourceStore.getResourceNames()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_PROJECTS,
        ])"
    >
        <div class="flex flex-col gap-4 bg-white">
            <ProjectsDupaDetails
                :project-information="projectStore.information"
                :task-information="taskStore.task"
            />
        </div>
    </LayoutAcessContainer>
</template>
