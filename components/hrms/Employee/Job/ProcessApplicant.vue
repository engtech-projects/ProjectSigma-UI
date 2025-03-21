<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore, HIRING_STATUS_HIRED, FILL_STATUS_PENDING } from "@/stores/hrms/employee/manpower"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"

const manpowers = useManpowerStore()
const { positionDetails } = storeToRefs(manpowers)
const jobapplicantstore = useJobapplicantStore()
const { jobapplicant } = storeToRefs(jobapplicantstore)

const snackbar = useSnackbar()
const route = useRoute()
const boardLoading = ref(false)

const handleStatusChange = async (applicant) => {
    try {
        jobapplicant.value = applicant
        boardLoading.value = true
        if (route.query.key) {
            jobapplicant.value.manpowerrequests_id = route.query.key
            await jobapplicantstore.updateJobapplicant()
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
        } else {
            snackbar.add({
                type: "error",
                text: "Failed to update."
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
const formatApplicantStatuses = (positionDetails) => {
    positionDetails.job_applicants = positionDetails.job_applicants.map((item) => {
        return {
            ...item,
            processing_checklist: JSON.parse(item.pivot.processing_checklist)
        }
    })
}
formatApplicantStatuses(positionDetails.value)

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await manpowers.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: manpowers.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}

const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await manpowers.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: manpowers.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}

</script>
<template>
    <div v-if="positionDetails.fill_status !== FILL_STATUS_PENDING">
        <template v-if="positionDetails.job_applicants && positionDetails.job_applicants.length > 0">
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
                        <tr v-for="(applicant, index) in positionDetails.job_applicants" :key="index" class="bg-white">
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
                                    <HrmsEmployeeJobStatusSet v-model:hiringStatus="applicant.pivot.hiring_status" v-model:processingChecklist="applicant.processing_checklist" v-model:remarks="applicant.remarks" />
                                </template>
                            </td>
                            <td class="border border-gray-400 p-2">
                                <template v-if="applicant.pivot.hiring_status === HIRING_STATUS_HIRED">
                                    <div class="bg-green-200 p-2 rounded">
                                        Hired
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="w-full flex justify-center items-center gap-4">
                                        <button class="p-2 bg-teal-200 hover:bg-teal-300 rounded" @click.prevent="handleStatusChange(applicant)">
                                            Update
                                            <Icon name="ic:twotone-system-update-alt" class="h-5 w-5 lg:h-5 lg:w-5" />
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
    <div class="w-full">
        <LayoutApprovalsListView :approvals="positionDetails.approvals" />
    </div>
    <div v-if="useCheckIsCurrentUser(positionDetails.next_approval?.user_id) && positionDetails.request_status === REQUEST_PENDING" class="w-full flex flex-col gap-4">
        <div class="flex gap-2 p-2 justify-end relative">
            <HrmsCommonApprovalDenyButton
                v-model:deny-remarks="remarks"
                :request-id="positionDetails.id"
                @approve="approvedRequest"
                @deny="denyRequest"
            />
        </div>
    </div>
</template>
