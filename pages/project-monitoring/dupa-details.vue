<script setup>
import { useTaskStore } from "~/stores/project-monitoring/task"
import { useResourceStore } from "~/stores/project-monitoring/resource"
const route = useRoute()
const taskStore = useTaskStore()
const resourceStore = useResourceStore()
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
            <ProjectsDupaDetails />
        </div>
    </LayoutAcessContainer>
</template>
