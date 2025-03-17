<script setup>
import { storeToRefs } from "pinia"
import { useJobapplicantStore } from "@/stores/hrms/employee/jobapplicant"
import { FILL_STATUS_OPEN } from "@/stores/hrms/employee/manpower"
const jobapplicants = useJobapplicantStore()

const { errorMessage, successMessage } = storeToRefs(jobapplicants)

const showAddApplicant = defineModel("showAddApplicant", { required: false, type: Boolean, default: false })

const props = defineProps({
    manpowerData: {
        type: Object,
        required: true,
    }
})

const emit = defineEmits(["setDetail"])
const setDetail = (event) => {
    emit("setDetail", props.manpowerData, event.target.value)
}
const addApplicant = () => {
    showAddApplicant.value = true
}
</script>
<template>
    <div>
        <LayoutEditBoards :title="manpowerData.fill_status === FILL_STATUS_OPEN ? 'Job Opening Details' : 'Manpower Request Details'" class="w-full" :loading="manpowerData.isLoading">
            <div class="text-gray-600 text-sm p-2">
                <div class="rounded p-2 grid grid-cols-2 " @change="setDetail">
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Fill Status: </span>
                        <span>{{ manpowerData.fill_status }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Request Status: </span>
                        <span>{{ manpowerData.request_status }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Requesting Department: </span>
                        <span>{{ manpowerData.requesting_department_name }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Requested By: </span>
                        <span>{{ manpowerData.requested_by_user_name }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Date Requested: </span>
                        <span>{{ manpowerData.date_requested }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Date Required: </span>
                        <span>{{ manpowerData.date_required }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Position: </span>
                        <span>{{ manpowerData.position?.name }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Employment Type: </span>
                        <span>{{ manpowerData.employment_type }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Brief Description: </span>
                        <span>{{ manpowerData.brief_description }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Job Description: </span>
                        <span class="truncate hover:cursor-pointer text-blue-500 italic">
                            <a target="_blank" :href="useHrmsDownloadLink(manpowerData.job_description_attachment)">
                                <Icon
                                    name="mage:file-download-fill"
                                    class="h-5 w-5 lg:h-5 lg:w-5"
                                />
                                Download
                            </a>
                        </span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Nature of Request: </span>
                        <span>{{ manpowerData.nature_of_request }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Age Range: </span>
                        <span>{{ manpowerData.age_range }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Status: </span>
                        <span>{{ manpowerData.status }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Gender: </span>
                        <span>{{ manpowerData.gender }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Educational Requirements: </span>
                        <span>{{ manpowerData.educational_requirement }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Preferred Qualifications: </span>
                        <span>{{ manpowerData.preferred_qualifications }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Remarks: </span>
                        <span>{{ manpowerData.remarks }}</span>
                    </div>
                    <div class="border px-4 py-2">
                        <span class="font-semibold">Total Applicants: </span>
                        <span>{{ manpowerData.job_applicants?.length || 0 }}</span>
                    </div>
                </div>
                <HrmsEmployeeJobProcessApplicant />
                <div class="flex justify-end mt-4">
                    <button v-show="manpowerData.fill_status === FILL_STATUS_OPEN" class="hover:text-green-500 flex items-center" @click="addApplicant">
                        <Icon name="pajamas:file-addition" class="h-4 w-4 " />
                        Add Applicant
                    </button>
                </div>
            </div>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic"
            >
                {{ successMessage }}
            </p>
        </LayoutEditBoards>
    </div>
</template>
