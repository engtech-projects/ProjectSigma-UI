<script setup>
// import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/employee/manpower"
import { useDepartmentStore } from "@/stores/hrms/departments"
import { useUserStore } from "@/stores/hrms/users"
import { useJobapplicantStore } from "~/stores/employee/jobapplicant"

const manpowers = useManpowerStore()
const departments = useDepartmentStore()
const user = useUserStore()
const ApplicantInformation = useJobapplicantStore()

manpowers.getManpower()
manpowers.getManpowerHiringRequests()
ApplicantInformation.getJobApplicantsDetails()
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
