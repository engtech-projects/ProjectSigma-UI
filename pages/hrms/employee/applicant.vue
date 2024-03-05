<script setup>
// import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
import { useDepartmentStore } from "@/stores/departments"
import { useUserStore } from "@/stores/hrms/users"

const manpowers = useManpowerStore()
const departments = useDepartmentStore()
const user = useUserStore()

manpowers.getManpower()
manpowers.getManpowerHiringRequests()
manpowers.getJobApplicantsDetails()
departments.getDepartmentList()
user.getUserEmployees()

useHead({
    title: "Job Applicants",
})

</script>

<template>
    <div class="flex flex-col md:flex-row gap-4">
        <HrmsEmployeeJobOpeningList />
    </div>
</template>
