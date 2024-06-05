<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useApprovalStore, APPROVAL_TRAVELORDER } from "@/stores/hrms/setup/approvals"

const approvals = useApprovalStore()

const travels = useTravelorderStore()
const { travel, errorMessage, successMessage } = storeToRefs(travels)

const formApproval = await approvals.getApprovalByName(APPROVAL_TRAVELORDER)
travel.value.approvals = formApproval

const snackbar = useSnackbar()
const boardLoading = ref(false)

const submitForm = async () => {
    try {
        boardLoading.value = true
        await travels.createRequest()
        if (travels.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: travels.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: travels.successMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: travels.errorMessage
        })
    } finally {
        travels.clearMessages()
        boardLoading.value = false
        travel.value.approvals = formApproval
    }
}
</script>

<template>
    <LayoutBoards title="Travel Order Form" class="w-full" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-2 gap-2">
                    <div class="flex-1 pt-8">
                        <div>
                            <HrmsCommonMultipleEmployeeSelector v-model="travel.employee_ids" />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div>
                            <label for="requestingOffice" class="text-sm italic font-semibold text-gray-700">Requesting Office</label>
                            <HrmsCommonDepartmentSelector
                                id="department"
                                v-model="travel.requesting_office"
                            />
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="travel.destination" title="Destination" />
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="travel.purpose_of_travel" title="Purpose of Travel" />
                        </div>
                        <div>
                            <label for="requstedBy" class="text-sm italic font-semibold text-gray-700">Date and Time of Travel</label>
                            <!-- <input
                                v-model="travel.date_and_time_of_travel"
                                type="date"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            > -->
                            <DateRangePicker v-model="travel.date_and_time_of_travel" />
                        </div>
                        <div>
                            <label for="requstedBy" class="text-sm italic font-semibold text-gray-700">Duration of Travel (days)</label>
                            <input
                                v-model="travel.duration_of_travel"
                                type="number"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            >
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="travel.means_of_transportation" title="Means of Transportation" />
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="travel.remarks" title="Remarks" />
                        </div>
                        <div>
                            <HrmsCommonRequestedBy title="Prepared by" />
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

                <div class="flex justify-end">
                    <button type="submit" class="flex-1 text-white p-2 rounded-lg bg-teal-600 content-center mt-5">
                        Submit Form
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
    </LayoutBoards>
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
