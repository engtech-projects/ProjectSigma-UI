<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
projects.getProject()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getProjectEnums()

useHead({
    title: "Projects",
})
</script>

<template>
    <div class="md:flex gap-2">
        <!-- <HrmsProjectCreateEmployee /> -->
        <HrmsProjectAssign />
        <!-- <HrmsProjectAttendanceScheduleForm /> -->
    </div>
</template>
