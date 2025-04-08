<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore, EMPLOYMENT_TYPE, NATURE_REQUESTS, STATUS, GENDER } from "@/stores/hrms/employee/manpower"
import { useApprovalStore, APPROVAL_MANPOWERREQ } from "@/stores/hrms/setup/approvals"

const manpowers = useManpowerStore()
const { manpower, errorMessage, successMessage, createData } = storeToRefs(manpowers)
const approvals = useApprovalStore()
const snackbar = useSnackbar()
const boardLoading = ref(false)

manpower.value.approvals = await approvals.getApprovalByName(APPROVAL_MANPOWERREQ)

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    manpower.value.job_description_attachment = file
}

const addManpwr = async () => {
    try {
        boardLoading.value = true
        await manpowers.createManpower()
        if (manpowers.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: manpowers.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: manpowers.successMessage
            })
        }
        manpower.value.approvals = await approvals.getApprovalByName(APPROVAL_MANPOWERREQ)
    } catch {
        snackbar.add({
            type: "error",
            text: manpowers.errorMessage
        })
    } finally {
        manpowers.clearMessages()
        boardLoading.value = false
    }
}
</script>
<template>
    <div class="relative">
        <div v-if="createData.isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div class="text-gray-500 p-2">
            <form @submit.prevent="addManpwr">
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-2">
                    <div class="pb-4">
                        <label for="reqDepartment" class="block text-sm font-medium text-gray-900 dark:text-white">Requesting Department</label>
                        <HrmsCommonDepartmentSelector id="reqDepartment" v-model="manpower.requesting_department" />
                    </div>
                    <div>
                        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                            <div class="div">
                                <label for="date_requested" class="block text-sm font-medium text-gray-900 dark:text-white">Date Requested</label>
                                <input id="date_requested" v-model="manpower.date_requested" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="div">
                                <label for="date_required" class="block text-sm font-medium text-gray-900 dark:text-white">Date Required</label>
                                <input id="date_required" v-model="manpower.date_required" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=" grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div class="pb-4">
                        <label for="position_title" class="block text-sm font-medium text-gray-900 dark:text-white">Position/Title</label>
                        <HrmsCommonPositionSelector id="position_title" v-model="manpower.position_id" />
                    </div>
                    <div>
                        <label for="employment_type" class="block text-sm font-medium text-gray-900 dark:text-white">Employment Type</label>
                        <select id="employment_type" v-model="manpower.employment_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="" disabled selected>
                                Choose Employment Type
                            </option>
                            <option v-for="employmentType, index2 in EMPLOYMENT_TYPE" :key="index2" :value="employmentType">
                                {{ employmentType }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class=" grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div class="pb-4">
                        <label for="brief_description" class="block  text-sm font-medium text-gray-900 dark:text-white">Brief Description</label>
                        <textarea id="brief_description" v-model="manpower.brief_description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                    </div>
                    <div class="pb-4">
                        <label for="job_description_attachment" class="block  text-sm font-medium text-gray-900 dark:text-white">Job Description Attachment</label>

                        <input
                            id="job_description_attachment"
                            class="block w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            type="file"
                            accept=".doc, .docx, .pdf"
                            required
                            @change="handleFileUpload"
                        >
                        <p class="flex justify-center mx-auto text-xs text-gray-500 dark:text-gray-300 uppercase">
                            doc/docx/pdf
                        </p>
                    </div>
                </div>
                <div class="pb-4 grid grid-cols-1 gap-2 sm:grid-cols-5">
                    <div class="col-span-2">
                        <label class="block text-sm font-medium text-gray-900 dark:text-white">Nature of Request</label>
                        <select id="natureReqs" v-model="manpower.nature_of_request" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="" disabled selected>
                                Choose Nature of Request
                            </option>
                            <option v-for="natureReqs, request in NATURE_REQUESTS" :key="request" :value="natureReqs">
                                {{ natureReqs }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white">Age Range</label>
                        <input id="age_range" v-model="manpower.age_range" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div>
                        <label class="block  text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select id="status" v-model="manpower.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="" disabled selected>
                                Choose Status
                            </option>
                            <option v-for="statusType, index3 in STATUS" :key="index3" :value="statusType">
                                {{ statusType }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block  text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                        <select id="gender" v-model="manpower.gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="" disabled selected>
                                Choose Gender
                            </option>
                            <option v-for="genderType, gender in GENDER" :key="gender" :value="genderType">
                                {{ genderType }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="pb-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <div>
                        <label for="educational_req" class="block  text-sm font-medium text-gray-900 dark:text-white">Educational Requirement</label>
                        <textarea id="educational_req" v-model="manpower.educational_requirement" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                    </div>
                    <div class="col-span-2">
                        <label for="pref_qualification" class="block whitespace-normal text-sm font-medium text-gray-900 dark:text-white">Preferred Qualifications / Experience (not mentioned above or in the Job Description)</label>
                        <textarea id="pref_qualification" v-model="manpower.preferred_qualifications" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                    </div>
                </div>
                <div class="pb-4">
                    <label for="remarks" class="block  text-sm font-medium text-gray-900 dark:text-white">Additional Remarks (Reason for Request)</label>
                    <textarea id="remarks" v-model="manpower.remarks" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>
                <HrmsCommonRequestedBy />
                <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                <div>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in manpower.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="manpower.approvals[apr]"
                    />
                </div>

                <div class="pt-4">
                    <button type="submit" class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </button>
                </div>
            </form>
            <p hidden class="error-message text-red-600 text-center font-semibold mt-2 italic" :class="{ 'fade-out': !errorMessage }">
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class="success-message text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </div>
</template>
