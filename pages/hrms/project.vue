<script setup>
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
projects.getProject()

useHead({
    title: "Projects",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_project_members,
        ])"
    >
        <div
            class="md:flex gap-2"
        >
            <HrmsProjectAssign />
        </div>
    </LayoutAcessContainer>
</template>
