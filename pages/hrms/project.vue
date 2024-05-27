<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
projects.getProject()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getProjectEnums()
enums.getDepartmentEnums()

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
