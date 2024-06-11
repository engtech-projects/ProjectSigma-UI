<script setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"

const jobapplicant = useJobapplicantStore()
jobapplicant.searchJobApplicants()
const { applicantSearchList, searchJobApplicantParams } = storeToRefs(jobapplicant)
const applicantInfo = ref({})
const emit = defineEmits(["searchChanged"])
watch(applicantInfo, async (newValue) => {
    if (newValue) {
        await jobapplicant.getJobApplicantInformation(newValue.id)
        emit("searchChanged", newValue)
    } else {
        employee.$reset()
        emit("searchChanged", null)
    }
})
</script>
<template>
    <div>
        <LayoutFormPsSelectSearch v-model:result="applicantInfo" v-model:search-input="searchJobApplicantParams.key" :search-list="applicantSearchList" title="fullname_last" placeholder="Search Applicants" />
    </div>
</template>
