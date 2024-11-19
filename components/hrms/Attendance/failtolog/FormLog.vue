<script setup lang="ts">
import { useFailToLogStore, LOG_TYPE } from "@/stores/hrms/attendance/failtolog"
import { useApprovalStore, APPROVAL_FAILTOLOG } from "~/stores/hrms/setup/approvals"

const failLogStore = useFailToLogStore()
const { createRequestData } = storeToRefs(failLogStore)

const approvals = useApprovalStore()
createRequestData.value.data.approvals = await approvals.getApprovalByName(APPROVAL_FAILTOLOG)

const snackbar = useSnackbar()

const submitAdd = async () => {
    try {
        const backupEmployeeSelected = createRequestData.value.data.employee_id
        await failLogStore.createLog()
        // failtolog.value.employee_id = null // Removed keep old employee because hard to reset lol
        snackbar.add({
            type: "success",
            text: createRequestData.value.successMessage
        })
        createRequestData.value.data.employee_id = backupEmployeeSelected
    } catch {
        snackbar.add({
            type: "error",
            text: createRequestData.value.errorMessage ?? "Something Went Wrong"
        })
    } finally {
        failLogStore.clearMessages()
    }
}
</script>
<template>
    <LayoutBoards title="Failure to Log Form" class="mt-2 edit-item w-full max-w-full" :loading="createRequestData.isLoading">
        <form @submit.prevent="submitAdd">
            <div class="w-full p-2">
                <div class="mt-2 grid gap-2 mb-2 md:grid-cols-2">
                    <HrmsCommonSearchEmployeeSelector v-model="createRequestData.data.employee_id" />
                    <div class="w-full">
                        <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Log Type</label>
                        <select v-model="createRequestData.data.log_type" name="" class="border border-gray-500 rounded-md">
                            <option value="" disabled selected>
                                Choose Log Type
                            </option>
                            <option v-for="(logType, index) in LOG_TYPE" :key="index" :value="logType">
                                {{ logType }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <LayoutFormPsDateInput v-model="createRequestData.data.date" title="Date" required />
                    </div>
                    <div>
                        <label for="time" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                        <input
                            id="time"
                            v-model="createRequestData.data.time"
                            type="time"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                    <HrmsCommonDepartmentProjectSelector
                        v-model:select-type="createRequestData.data.charging_type"
                        v-model:department-id="createRequestData.data.department_id"
                        v-model:project-id="createRequestData.data.project_id"
                        title="Charging"
                        class="p-2"
                    />
                    <div class="w-full">
                        <LayoutFormPsTextInput v-model="createRequestData.data.reason" title="Reason" />
                    </div>
                </div>

                <div class="w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals:</label>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in createRequestData.data.approvals"
                            :key="'hrmsetupapprovallist' + apr"
                            v-model="createRequestData.data.approvals[apr]"
                        />
                    </div>
                </div>
                <div class="max-w-full flex flex-row-reverse mt-5">
                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add
                    </button>
                </div>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped>
#employee_leave_table .vue3-easy-data-table__footer{
    display: none !important;
}
</style>
