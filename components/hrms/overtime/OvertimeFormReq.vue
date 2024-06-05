<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"
import { useApprovalStore, APPROVAL_OVERTIME } from "@/stores/hrms/setup/approvals"
import { useEnumsStore } from "@/stores/hrms/enum"

const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
if (allEmployeeEnum.value.list.length <= 0) {
    enums.getEmployeeEnum()
}
const approvals = useApprovalStore()

const overtimes = useOvertimeStore()
const { overtime, errorMessage, successMessage } = storeToRefs(overtimes)

overtime.value.approvals = await approvals.getApprovalByName(APPROVAL_OVERTIME)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const submitForm = async () => {
    try {
        boardLoading.value = true
        await overtimes.createRequest()
        if (overtimes.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: overtimes.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: overtimes.successMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: overtimes.errorMessage
        })
    } finally {
        overtimes.clearMessages()
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="Overtime Authorization Form" class="w-full" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="submitForm">
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div class="flex-1 gap-4">
                        <HrmsCommonDepartmentProjectSelector
                            v-model:select-type="allEmployeeEnum.params.filterType"
                            v-model:department-id="overtime.department_id"
                            v-model:project-id="overtime.project_id"
                        />
                        <label for="selectEmp" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Employee Selection</label>
                        <HrmsCommonMultipleEmployeeSelector v-model="overtime.employees" title="Employee Name" name="Employee Name" />
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div>
                            <label for="requstedBy" class="text-sm font-semibold text-gray-700">Date of Overtime</label>
                            <input
                                v-model="overtime.overtime_date"
                                type="date"
                                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            >
                        </div>
                        <div>
                            <label for="time_from" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">From</label>
                            <input
                                id="time_from"
                                v-model="overtime.overtime_start_time"
                                type="time"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                        </div>
                        <div>
                            <label for="time_to" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">To</label>
                            <input
                                id="time_to"
                                v-model="overtime.overtime_end_time"
                                type="time"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                        </div>
                        <div>
                            <LayoutFormPsTextInput v-model="overtime.reason" title="Purpose/Reason" name="Purpose/Reason" />
                        </div>
                        <HrmsCommonRequestedBy title="Prepared by" />
                    </div>
                </div>
                <div class="w-full rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in overtime.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="overtime.approvals[apr]"
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
