<script setup>
import { useResourceStore } from "@/stores/project-monitoring/resource"
const resourceStore = useResourceStore()
resourceStore.getResourceUnits()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECT_MONITORING_PROJECTS,
        ])"
    >
        <div class="flex flex-col gap-4">
            <ProjectsDetails />
        </div>
    </LayoutAcessContainer>
</template>
