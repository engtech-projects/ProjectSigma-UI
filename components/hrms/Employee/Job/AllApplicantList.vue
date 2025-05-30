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

const changePaginate = (newParams) => {
    allJobApplicants.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Applicant Name", id: "fullname_last" },
    { name: "Position Desired", id: "desired_position" },
    { name: "Position in Manpower Request", id: "position" },
    { name: "Status", id: "status" },
    { name: "Date added", id: "created_at" },
]
const actions = {
    showTable: true,
}
const applicantInfo = ref({})
const applicantDetail = ref(false)
const applicantDetails = (applic) => {
    applicantDetail.value = true
    applicantInfo.value = applic
}
</script>
<template>
    <LayoutLoadingContainer class="w-full p-4" :loading="allJobApplicants.isLoading">
        <div class="flex flex-row gap-4 p-2">
            <HrmsEmployeeJobHiringFilter v-model:status="allJobApplicants.params.status" v-model:applicant="allJobApplicants.params.name" />
        </div>
        <div class="text-gray-500 text-[12px] overflow-y-auto p-2">
            <table class="table-auto w-full border-collapse">
                <thead>
                    <tr>
                        <th
                            v-for="header in headers"
                            :key="header.name+'headerRow'"
                            class="p-2"
                            :class="header.style ?? ''"
                        >
                            {{ header.name }}
                        </th>
                        <th v-if="actions" class="p-2">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(applicant, index) in allJobApplicants.list" :key="index" class="border text-center">
                        <td class="p-2">
                            {{ applicant.fullname_last }}
                        </td>
                        <td class="p-2">
                            {{ applicant.desired_position }}
                        </td>
                        <td class="p-2">
                            {{ applicant.position }}
                        </td>
                        <td class="p-2">
                            {{ applicant.status }}
                        </td>
                        <td class="p-2">
                            {{ applicant.created_at }}
                        </td>
                        <td class="p-2">
                            <button v-if="actions.showTable" @click="applicantDetails(applicant)">
                                <Icon name="material-symbols:visibility-rounded" color="white" class="bg-teal-700 rounded h-8 w-8 p-1" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex justify-center mx-auto p-2">
            <CustomPagination :links="allJobApplicants.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <PsModal v-model:show-modal="applicantDetail" title="APPLICANT DETAILS">
        <template #body>
            <HrmsEmployeeJobApplicantDetailsApplicantInfo :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsApplicantPermanentAddress :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsApplicantPresentAddress :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsApplicantChildren :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsEducationPrimaryEducation :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsEducationCollegeEducation :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsEducationVocationalEducation :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsApplicantSpouseInfo :applicant="applicantInfo" />
            <HrmsEmployeeJobApplicantDetailsApplicantContactPerson :applicant="applicantInfo" />
        </template>
    </PsModal>
</template>
