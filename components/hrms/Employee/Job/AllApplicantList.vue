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
const infoModalData = ref({})
const showInfoModal = ref(false)

const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}
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

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="allJobApplicants.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allJobApplicants.list ?? []"
                @show-table="showInformation"
            />
        </div>
        <div class="flex justify-center mx-auto p-2">
            <CustomPagination :links="allJobApplicants.pagination" @change-params="changePaginate" />
        </div>
    </LayoutLoadingContainer>
    <HrmsEmployeeManpowerInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
