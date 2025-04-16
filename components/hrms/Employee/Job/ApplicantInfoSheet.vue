<script setup>

import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"

const jobApplicant = useJobapplicantStore()
const { allJobApplicants } = storeToRefs(jobApplicant)

onMounted(() => {
    if (!allJobApplicants.value.isLoaded) {
        jobApplicant.getAllJobApplicant()
    }
})

const applicantInfo = ref({})
</script>
<template>
    <div class="overflow-auto">
        <HrmsEmployeeJobApplicantDetailsApplicantInfo :applicant="applicantInfo" />
        <HrmsEmployeeJobApplicantDetailsApplicantPermanentAddress :applicant="applicantInfo" />
        <HrmsEmployeeJobApplicantDetailsApplicantPresentAddress :applicant="applicantInfo" />
    </div>
</template>
