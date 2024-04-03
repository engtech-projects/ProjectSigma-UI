<script setup>
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useProjectStore } from "@/stores/project-monitoring/projects"

const projects = useProjectStore()
projects.getProject()

const employee = useEmployeeInfo()
employee.getEmployeeList()

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
