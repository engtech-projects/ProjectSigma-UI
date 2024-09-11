<script setup lang="ts">
import { useFailToLogStore, LOG_TYPE } from "@/stores/hrms/attendance/failtolog"
import { useApprovalStore, APPROVAL_FAILTOLOG } from "~/stores/hrms/setup/approvals"

const failtologs = useFailToLogStore()
const { failtolog } = storeToRefs(failtologs)

const approvals = useApprovalStore()
failtolog.value.approvals = await approvals.getApprovalByName(APPROVAL_FAILTOLOG)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const submitAdd = async () => {
    try {
        boardLoading.value = true
        await failtologs.createLog()
        if (failtologs.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: failtologs.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: failtologs.successMessage
            })
        }
        failtolog.value.employee_id = null
        failtolog.value.approvals = await approvals.getApprovalByName(APPROVAL_FAILTOLOG)
    } catch {
        snackbar.add({
            type: "error",
            text: failtologs.errorMessage
        })
    } finally {
        boardLoading.value = false
        failtologs.clearMessages()
    }
}
</script>
<template>
    <LayoutBoards title="Failure to Log Form" class="mt-2 edit-item w-full max-w-full" :loading="boardLoading">
        <form @submit.prevent="submitAdd">
            <div class="w-full p-2">
                <div class="mt-2 grid gap-6 mb-2 md:grid-cols-2">
                    <HrmsCommonSearchEmployeeSelector v-model="failtolog.employee_id" />
                    <div class="w-full">
                        <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Log Type</label>
                        <select v-model="failtolog.log_type" name="" class="border border-gray-500 rounded-md">
                            <option value="" disabled selected>
                                Choose Log Type
                            </option>
                            <option v-for="(logType, index) in LOG_TYPE" :key="index" :value="logType">
                                {{ logType }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <LayoutFormPsDateInput v-model="failtolog.date" title="Date" required />
                    </div>
                    <div>
                        <label for="time" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                        <input
                            id="time"
                            v-model="failtolog.time"
                            type="time"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                    <HrmsCommonDepartmentProjectSelector
                        v-model:select-type="failtolog.charging_type"
                        v-model:department-id="failtolog.charging_id"
                        v-model:project-id="failtolog.charging_id"
                        title="Filter Department/Project"
                    />
                    <div class="w-full">
                        <LayoutFormPsTextInput v-model="failtolog.reason" title="Reason" />
                    </div>
                </div>

                <div class="w-full">
                    <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in failtolog.approvals"
                            :key="'hrmsetupapprovallist' + apr"
                            v-model="failtolog.approvals[apr]"
                        />
                    </div>
                    <!-- <div class="w-full">
                        <label for="" class="text-xl font-semibold text-gray-900">EMPLOYEE'S LEAVE RECORD (HRD use only)</label>
                        <pre>{{ employeeinfo }}</pre>
                        <LayoutPsTable :header-columns="headers" :datas="employeeinfo.leaveCredits" />
                    </div> -->
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
