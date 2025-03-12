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
    { name: "Hiring Status", id: "status" },
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
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allJobApplicants.list ?? []"
                @show-table="applicantDetails"
            />
        </div>
        <div class="flex justify-center mx-auto p-2">
            <CustomPagination :links="allJobApplicants.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <PsModal v-model:show-modal="applicantDetail" :is-loading="boardLoading" title="APPLICANT DETAILS">
        <template #body>
            <HrmsEmployeeJobApplicantList :applicant="applicantInfo" />
        </template>
    </PsModal>
</template>
