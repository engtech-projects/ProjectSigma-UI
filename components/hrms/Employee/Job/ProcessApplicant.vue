<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"

const manpowers = useManpowerStore()
const { manpower, HIRING_STATUS_FOR_HIRING, HIRING_STATUS_REJECTED, HIRING_STATUS_HIRED } = storeToRefs(manpowers)
const jobapplicantstore = useJobapplicantStore()
const { jobapplicant } = storeToRefs(jobapplicantstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const handleStatusChange = async (applicant, status) => {
    try {
        jobapplicant.value = applicant
        boardLoading.value = true
        await jobapplicantstore.updateJobapplicant(status)
        if (jobapplicantstore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: jobapplicantstore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: jobapplicantstore.successMessage
            })
        }
    } catch (error) {
        errorMessage.value = errorMessage
        snackbar.add({
            type: "error",
            text: jobapplicantstore.errorMessage
        })
    } finally {
        jobapplicantstore.clearMessages()
        boardLoading.value = false
    }
}
const applicantInfo = ref({})
const applicantDetail = ref(false)
const applicantDetails = (applic) => {
    applicantDetail.value = true
    applicantInfo.value = applic
}
const formatApplicantStatuses = (manpower) => {
    manpower.job_applicants = manpower.job_applicants.map((item) => {
        return {
            ...item,
            processing_checklist: JSON.parse(item.pivot.processing_checklist)
        }
    })
}
formatApplicantStatuses(manpower.value)

</script>
<template>
    <div>
        <template v-if="manpower.job_applicants && manpower.job_applicants.length > 0">
            <div class="overflow--auto">
                <table class="table-auto border-collapse w-full">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="border border-gray-400 p-2">
                                Applicant Name
                            </th>
                            <th class="border border-gray-400 p-2">
                                Status and Remarks
                            </th>
                            <th class="border border-gray-400 p-2">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(applicant, index) in manpower.job_applicants" :key="index" class="bg-white">
                            <td class="border border-gray-400 p-2">
                                <span class="cursor-pointer text-blue-500" @click="applicantDetails(applicant)">
                                    {{ applicant.firstname }} {{ applicant.middlename }} {{ applicant.lastname }}
                                </span>
                            </td>
                            <td class="border border-gray-400 p-2">
                                <template v-if="applicant.pivot.hiring_status === HIRING_STATUS_HIRED">
                                    <div class="bg-green-200 p-2 rounded">
                                        Hired
                                    </div>
                                </template>
                                <template v-else>
                                    <HrmsEmployeeJobProcessCheckList v-model:processingChecklist="applicant.processing_checklist" v-model:remarks="applicant.remarks" />
                                </template>
                            </td>
                            <td class="border border-gray-400 p-2">
                                <template v-if="applicant.pivot.hiring_status === HIRING_STATUS_HIRED">
                                    <div class="bg-green-200 p-2 rounded">
                                        Hired
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="flex flex-row gap-4">
                                        <button class="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded" @click.prevent="handleStatusChange(applicant, HIRING_STATUS_FOR_HIRING)">
                                            For Hiring
                                        </button>
                                        <button class="p-2 bg-red-600 hover:bg-red-700 rounded text-white" @click.prevent="handleStatusChange(applicant, HIRING_STATUS_REJECTED)">
                                            Rejected
                                        </button>
                                    </div>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
        <template v-else>
            <div class="flex mx-auto justify-center italic p-6">
                No applicants available.
            </div>
        </template>
        <PsModal v-model:show-modal="applicantDetail" :is-loading="boardLoading" title="APPLICANT DETAILS">
            <template #body>
                <HrmsEmployeeJobApplicantList :applicant="applicantInfo" />
            </template>
        </PsModal>
    </div>
</template>
