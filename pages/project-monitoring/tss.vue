<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"
const projectStore = useProjectStore()
const awardee = true
projectStore.viewState = true
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.PROJECTMONITORING_TSS,
        ])"
    >
        <div class="flex flex-col gap-4">
            <ProjectsMydraftsDetails :awardee="awardee" />
        </div>
    </LayoutAcessContainer>
</template>
