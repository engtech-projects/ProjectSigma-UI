<script setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/employee/jobapplicant"
import { usePersonelActionNotice } from "@/stores/hrms/pan"

const jobapplicant = useJobapplicantStore()
const pan = usePersonelActionNotice()
jobapplicant.searchJobApplicants()
const { applicantSearchList, searchJobApplicantParams } = storeToRefs(jobapplicant)

const selectJobApplicant = async (id) => {
    applicantSearchList.value = []
    searchJobApplicantParams.value.key = null
    await jobapplicant.getJobApplicantInformation(id)
    pan.personelActionNotice.pan_job_applicant_id = jobapplicant.jobapplicant.id
    pan.personelActionNotice.employee = jobapplicant.fullname
}
</script>
<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input
                    id="default-search"
                    v-model="searchJobApplicantParams.key"
                    type="search"
                    class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    placeholder="Search New Hire"
                >
            </div>
        </form>
        <ul v-if="applicantSearchList.length > 0" class="mt-1 p-px rounded-lg bg-white dark:bg-gray-800">
            <li v-for="(applicant, i) in applicantSearchList" :key="i" class="hover:bg-teal-200 rounded-md cursor-pointer p-1" @click="selectJobApplicant(applicant.id)">
                {{ applicant.lastname }}, {{ applicant.firstname }} {{ applicant.middlename || "" }}
            </li>
        </ul>
    </div>
</template>
