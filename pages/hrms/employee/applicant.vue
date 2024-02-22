<script setup>
import { useManpowerStore } from "@/stores/employee/manpower"
import { useDepartmentStore } from "@/stores/departments"
import { useUserStore } from "@/stores/hrms/users"

const departments = useDepartmentStore()
const manpowers = useManpowerStore()
const user = useUserStore()
manpowers.getManpower()
departments.getDepartmentList()
user.getUserEmployees()

useHead({
    title: "Job Applicants",
})

</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsEmployeeJobOpeningList />
        <!-- <HrmsEmployeeJobApplicantList /> -->
        <!-- <HrmsEmployeeJobApplicationForm /> -->
    </div>
</template>
