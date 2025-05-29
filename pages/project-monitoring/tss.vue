<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
projectStore.viewState = true
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECTMONITORING_TSS,
        ])"
    >
        <div class="flex flex-col gap-4">
            <ProjectsDetails />
        </div>
    </LayoutAcessContainer>
</template>
