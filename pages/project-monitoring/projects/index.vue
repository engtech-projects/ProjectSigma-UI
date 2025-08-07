<script lang="ts" setup>
import { useProjectStore } from "~/stores/project-monitoring/projects"
const projectStore = useProjectStore()

projectStore.getActiveProjects()
definePageMeta({
    layout: "default",
})
useHead({
    title: "Projects",
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECTMONITORING_PROJECTS,
        ])"
    >
        <ProjectMonitoringProjectsActiveList />
    </LayoutAcessContainer>
</template>
