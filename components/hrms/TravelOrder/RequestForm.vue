<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useApprovalStore, APPROVAL_TRAVELORDER } from "@/stores/hrms/setup/approvals"
const approvals = useApprovalStore()
const travels = useTravelorderStore()
const { createRequestData, errorMessage, successMessage } = storeToRefs(travels)
onMounted(() => {
    createRequestData.value.body.approvals = approvals.getApprovalByName(APPROVAL_TRAVELORDER)
})
const snackbar = useSnackbar()
const boardLoading = ref(false)
const submitForm = async () => {
    try {
        await travels.createRequest()
        snackbar.add({
            type: "success",
            text: travels.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: travels.errorMessage
        })
    } finally {
        createRequestData.value.body.approvals = await approvals.getApprovalByName(APPROVAL_TRAVELORDER)
        boardLoading.value = false
    }
}
const startDateTime = computed(() => {
    return `${createRequestData.value.body.date_of_travel}T${createRequestData.value.body.time_of_travel}:00`
})
const endDateTime = computed(() => {
    if (!createRequestData.value.body.date_of_travel || !createRequestData.value.body.time_of_travel || !createRequestData.value.body.duration_of_travel) {
        return ""
    }
    const newDate = new Date(startDateTime.value)
    newDate.setHours(newDate.getHours() + createRequestData.value.body.duration_of_travel * 24)
    return useFormatDateTimeString(newDate)
})
</script>
<template>
    <LayoutBoards title="Travel Order Form" class="w-full" :loading="createRequestData.isLoading">
        <div class="text-gray-500">
            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
                    <div class="flex-1 pt-8">
                        <div class="flex flex-col gap-2">
                            <HrmsCommonMultipleEmployeeSelector
                                v-model="createRequestData.body.employee_ids"
                            />
                            <HrmsCommonDepartmentProjectSelector
                                v-model:select-type="createRequestData.body.charge_type"
                                v-model:department-id="createRequestData.body.department_id"
                                v-model:project-id="createRequestData.body.project_id"
                                title="Charging"
                            />
                        </div>
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div>
                            <label for="requestingOffice" class="text-sm italic font-semibold text-gray-700">Requesting Office</label>
                            <HrmsCommonDepartmentSelector
                                id="department"
                                v-model="createRequestData.body.requesting_office"
                            />
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="createRequestData.body.destination" title="Destination" />
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="createRequestData.body.purpose_of_travel" title="Purpose of Travel" />
                        </div>
                        <div>
                            <label for="DOT" class="text-sm italic font-semibold text-gray-700">Date of Travel</label>
                            <input
                                v-model="createRequestData.body.date_of_travel"
                                type="date"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            >
                            <!-- <DateRangePicker v-model="createRequestData.body.date_and_time_of_travel" /> -->
                        </div>
                        <div>
                            <label for="TOT" class="text-sm italic font-semibold text-gray-700">Time of Travel</label>
                            <input
                                v-model="createRequestData.body.time_of_travel"
                                type="time"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            >
                        </div>
                        <div>
                            <label for="requstedBy" class="text-sm italic font-semibold text-gray-700">Duration of Travel (days)</label>
                            <input
                                v-model="createRequestData.body.duration_of_travel"
                                type="number"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                step="0.1"
                                min="0"
                            >
                        </div>
                        <div>
                            <label for="endoftravel" class="text-sm italic font-semibold text-gray-700">End of Travel</label>
                            <input
                                id="endoftravel"
                                :value="endDateTime"
                                type="text"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                step="0.1"
                                min="0"
                                disabled
                            >
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="createRequestData.body.means_of_transportation" title="Means of Transportation" />
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="createRequestData.body.remarks" title="Remarks" />
                        </div>
                        <div class>
                            <HrmsCommonRequestedBy title="Prepared by" />
                        </div>
                    </div>
                </div>
                <div class="w-full rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in createRequestData.body.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="createRequestData.body.approvals[apr]"
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
