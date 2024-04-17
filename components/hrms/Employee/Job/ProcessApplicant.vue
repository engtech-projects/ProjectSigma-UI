<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"

const manpowers = useManpowerStore()
const { manpower } = storeToRefs(manpowers)
const jobapplicantstore = useJobapplicantStore()
const { jobapplicant } = storeToRefs(jobapplicantstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const handleStatusChange = async (applicant) => {
    try {
        jobapplicant.value = applicant
        boardLoading.value = true
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
const closeApplicantDetail = () => {
    applicantDetail.value = false
}
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
                                <HrmsEmployeeJobStatusSet v-model:status="applicant.status" v-model:remarks="applicant.remarks" />
                            </td>
                            <td class="border border-gray-400 p-2">
                                <button class="p-2 bg-teal-200 hover:bg-teal-300 rounded" @click.prevent="handleStatusChange(applicant)">
                                    Update
                                    <Icon name="ic:twotone-system-update-alt" class="h-5 w-5 lg:h-5 lg:w-5" />
                                </button>
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

        <Teleport to="body">
            <div v-if="applicantDetail" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70" @click="closeApplicantDetail">
                <div class="p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute" @click.stop>
                    <div v-if="applicantDetail">
                        <div v-for="(applicant, key) in applicantDetail" :key="key" class="border px-4 py-2">
                            <span class="font-semibold">{{ key }}:</span>
                            <span>{{ applicant }}</span>
                        </div>
                    </div>
                    <HrmsEmployeeJobApplicantList :applicant="applicantInfo" />
                </div>
            </div>
        </Teleport>
    </div>
</template>
