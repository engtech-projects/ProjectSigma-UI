<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useApprovalStore, APPROVAL_TRAVELORDER } from "@/stores/hrms/setup/approvals"
const { data: userData } = useAuth()

const departments = useDepartmentStore()
const { departmentsList } = storeToRefs(departments)

const approvals = useApprovalStore()

const travels = useTravelorderStore()
const { travel, errorMessage, successMessage } = storeToRefs(travels)

travel.value.approvals = await approvals.getApprovalByName(APPROVAL_TRAVELORDER)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const cancelEdit = () => {
    travels.$reset()
}
const editRequest = async () => {
    try {
        boardLoading.value = true
        await travels.editRequest()
        snackbar.add({
            type: "success",
            text: travels.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: travels.errorMessage || "something went wrong."
        })
    } finally {
        travels.clearMessages()
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutEditBoards title="Travel Order Form" class="w-full" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="editRequest">
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <HrmsCommonEmployeeSelector v-model="travel.employee_ids" />
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div>
                            <label for="requestingOffice" class="text-sm italic font-semibold text-gray-700">Requesting Office</label>
                            <select
                                id="department"
                                v-model="travel.requesting_office"
                                class="w-full rounded-lg bg-slate-100 border border-slate-300 cursor-pointer focus:outline focus:outline-color1 focus:bg-white"
                            >
                                <option value="" disabled selected>
                                    Choose Department
                                </option>
                                <option v-for="dpt, index in departmentsList" :key="index" :value=" dpt.id">
                                    {{ dpt.department_name }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="destination" class="text-sm italic font-semibold text-gray-700">Destination</label>
                            <input
                                id="destination"
                                v-model="travel.destination"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div>
                            <label for="purposeOfTravel" class="text-sm italic font-semibold text-gray-700">Purpose of Travel</label>
                            <input
                                id="purposeOfTravel"
                                v-model="travel.purpose_of_travel"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div>
                            <label for="DateTimeTravel" class="text-sm italic font-semibold text-gray-700">Date and Time of Travel</label>
                            <!-- <VueDatePicker v-model="travel.date_and_time_of_travel" :is-24="false" /> -->
                            <input
                                id="DateTimeTravel"
                                v-model="travel.date_and_time_of_travel"
                                type="date"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div>
                            <label for="DurationTravel" class="text-sm italic font-semibold text-gray-700">Duration of Travel (days)</label>
                            <input
                                id="DurationTravel"
                                v-model="travel.duration_of_travel"
                                type="number"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div>
                            <label for="MeansTravel" class="text-sm italic font-semibold text-gray-700">Means of Transportation</label>
                            <input
                                id="MeansTravel"
                                v-model="travel.means_of_transportation"
                                type="text"
                                class="w-full rounded-lg"
                            >
                        </div>
                        <div>
                            <label for="remarks" class="text-sm italic font-semibold text-gray-700">Remarks</label>
                            <input
                                id="remarks"
                                v-model="travel.remarks"
                                type="text"
                                class="w-full rounded-lg "
                            >
                        </div>
                        <div>
                            <label for="requstedBy" class="text-sm italic font-semibold text-gray-700">Requested By</label>
                            <input
                                :value="userData.name"
                                type="number"
                                disabled
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            >
                        </div>
                    </div>
                </div>
                <div class="w-full rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in travel.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="travel.approvals[apr]"
                    />
                </div>

                <!-- <div>
                    <EasyDataTable
                        v-model:items-selected="selectedEmployees"
                        class="mt-5"
                        :headers="headers"
                        :items="employeeList"
                    />
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
            <p
                hidden
                class=" text-red-600 text-center font-semibold mt-2 italic"
                :class="{ 'fade-out': !errorMessage }"
            >
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class=" text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutEditBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
