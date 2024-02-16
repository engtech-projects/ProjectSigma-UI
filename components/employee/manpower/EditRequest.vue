<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore, EMPLOYMENT_TYPE, NATURE_REQUESTS, STATUS, GENDER } from "@/stores/employee/manpower"
import { useDepartmentStore } from "@/stores/departments"

const { data: userData } = useAuth()
const departments = useDepartmentStore()
const { departmentsList } = storeToRefs(departments)
const manpowers = useManpowerStore()
const { manpower, errorMessage, successMessage } = storeToRefs(manpowers)

manpower.value.requested_by = userData.value.id

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    manpowers.reset()
}

const editManpwr = async () => {
    try {
        boardLoading.value = true
        await manpowers.editManpower()
        snackbar.add({
            type: "success",
            text: manpowers.successMessage
        })
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
    <LayoutEditBoards title="Edit Manpower Request" :loading="boardLoading">
        <div class="text-gray-500 p-2">
            <form @submit.prevent="editManpwr">
                <div class="grid grid-cols-2 gap-2 sm:grid-cols-2">
                    <div class="pb-4">
                        <label for="reqDepartment" class="block text-sm font-medium text-gray-900 dark:text-white">Requesting Department</label>
                        <select id="reqDepartment" v-model="manpower.requesting_department" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="" disabled selected>
                                Choose Department
                            </option>
                            <option v-for="dpt, index in departmentsList" :key="index" :value=" dpt.id">
                                {{ dpt.department_name }}
                            </option>
                        </select>
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
                        <input id="position_title" v-model="manpower.position" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                        <textarea id="job_description_attachment" v-model="manpower.job_description_attachment" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
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
                <div class="pb-4">
                    <label for="educational_req" class="block  text-sm font-medium text-gray-900 dark:text-white">Educational Requirement</label>
                    <textarea id="educational_req" v-model="manpower.educational_requirement" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>
                <div class="pb-4">
                    <label for="pref_qualification" class="block  text-sm font-medium text-gray-900 dark:text-white">Preferred Qualifications / Experience (not mentioned above or in the Job Description)</label>
                    <textarea id="pref_qualification" v-model="manpower.preferred_qualifications" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>
                <div class="pb-4">
                    <label for="remarks" class="block  text-sm font-medium text-gray-900 dark:text-white">Additional Remarks (Reason for Request)</label>
                    <textarea id="remarks" v-model="manpower.remarks" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                </div>
                <div class="pb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div>
                        <label for="requested_by" class="block  text-sm font-medium text-gray-900 dark:text-white">Requested by</label>
                        <input
                            id="requested_by"
                            :value="userData.name"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            disabled
                        >
                    </div>
                    <!-- <div>
                        <label for="approved_by" class="block  text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                        <select id="approved_by" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                            <option value="">
                                Select options
                            </option>
                            <option value="1">
                                Lorem 1
                            </option>
                            <option value="2">
                                Lorem 2
                            </option>
                            <option value="3">
                                Lorem 3
                            </option>
                        </select>
                    </div> -->
                </div>
                <!-- <div class="pb-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div class="pb-4">
                        <label for="requested_status" class="block  text-sm font-medium text-gray-900 dark:text-white">Requested Status</label>
                        <select id="requested_status" v-model="manpower.request_status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="" disabled selected>
                                Choose Request Status
                            </option>
                            <option v-for="requestStatus, reqStats in REQUEST_STATUS" :key="reqStats" :value="requestStatus">
                                {{ requestStatus }}
                            </option>
                        </select>
                    </div>

                    <div class="pb-4">
                        <label for="charged_to" class="block whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Charged to (Department)</label>
                        <select id="charged_to" v-model="manpower.charged_to" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="" disabled selected>
                                Choose Department
                            </option>
                            <option v-for="dpt, chargedTo in departmentsList" :key="chargedTo" :value=" dpt.id">
                                {{ dpt.department_name }}
                            </option>
                        </select>
                    </div>
                    <div class="pb-4">
                        <label for="breakdown_details" class="block  text-sm font-medium text-gray-900 dark:text-white">Breakdown Details</label>
                        <input id="breakdown_details" v-model="manpower.breakdown_details" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div> -->
                <!-- <div class="pb-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div class="pb-4">
                        <label for="processed_by" class="block  text-sm font-medium text-gray-900 dark:text-white">Processed by</label>
                        <select id="processed_by" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="">
                                Select options
                            </option>
                            <option value="1">
                                Lorem 1
                            </option>
                            <option value="2">
                                Lorem 2
                            </option>
                            <option value="3">
                                Lorem 3
                            </option>
                        </select>
                    </div>
                    <div class="pb-4">
                        <label for="checked_by" class="block  text-sm font-medium text-gray-900 dark:text-white">Checked / Approved by</label>
                        <select id="checked_by" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            <option value="">
                                Select options
                            </option>
                            <option value="1">
                                Lorem 1
                            </option>
                            <option value="2">
                                Lorem 2
                            </option>
                            <option value="3">
                                Lorem 3
                            </option>
                        </select>
                    </div>
                </div> -->
                <div class="flex justify-end gap-2">
                    <button
                        type="submit"
                        class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5 hover:bg-teal-500"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        class="flex-1 text-white p-2 rounded bg-gray-700 content-center mt-5 hover:bg-gray-500"
                        @click="cancelEdit"
                    >
                        Cancel
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
    </LayoutEditBoards>
</template>
