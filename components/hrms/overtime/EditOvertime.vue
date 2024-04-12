<script setup lang="ts">
import { storeToRefs } from "pinia"
import type { Item, Header } from "vue3-easy-data-table"
import { useEnumsStore } from "@/stores/hrms/enum"
import { useDepartmentStore } from "@/stores/hrms/setup/departments"
import { useOvertimeStore } from "@/stores/hrms/overtime"
import { useProjectStore } from "@/stores/project-monitoring/projects"
import { useApprovalStore, APPROVAL_OVERTIME } from "@/stores/hrms/setup/approvals"

const { data: userData } = useAuth()

const enums = useEnumsStore()
const { employeeEnum } = storeToRefs(enums)

const departments = useDepartmentStore()
const { departmentsList } = storeToRefs(departments)

const projects = useProjectStore()
const { list: projectList } = storeToRefs(projects)

const approvals = useApprovalStore()

const overtimes = useOvertimeStore()
const { overtime, errorMessage, successMessage } = storeToRefs(overtimes)

overtime.value.approvals = await approvals.getApprovalByName(APPROVAL_OVERTIME)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const selectedEmployees = ref<Item[]>([])

const headers: Header[] = [
    {
        text: "Employee Name", value: "fullname_last",
    },
]

const formatTime = (time: string) => {
    const timeParts = time.split(":")
    const [hours, minutes, seconds] = timeParts.map(part => parseInt(part, 10) || 0)

    if (timeParts.length === 2 || timeParts.length === 3) {
        if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59 && seconds >= 0 && seconds <= 59) {
            return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        }
        return "Invalid time value. Hours (0-23), Minutes (0-59), Seconds (0-59)"
    }

    return "Invalid time format. Please use HH:mm or HH:mm:ss"
}

const cancelEdit = () => {
    overtimes.$reset()
}
const editRequest = async () => {
    try {
        boardLoading.value = true
        overtime.value.overtime_start_time = formatTime(overtime.value.overtime_start_time)
        overtime.value.overtime_end_time = formatTime(overtime.value.overtime_end_time)
        overtime.value.employees = selectedEmployees.value.map(emp => emp.id)
        await overtimes.editRequest()
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
        })
    } catch {
        snackbar.add({
            type: "error",
            text: overtimes.errorMessage || "something went wrong."
        })
    } finally {
        overtimes.clearMessages()
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutEditBoards title="Edit Overtime Request" class="w-full" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="editRequest">
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div class="flex-1 gap-4">
                        <div class="pt-2">
                            <label for="project_name" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Project Selection</label>
                            <select id="project_name" v-model="overtime.project_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="" disabled selected>
                                    Choose Project
                                </option>
                                <option v-for="proj, id in projectList" :key="id" :value="proj.id">
                                    {{ proj.contract_name }}
                                </option>
                            </select>
                        </div>
                        <label for="selectEmp" class="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Employee Selection</label>
                        <EasyDataTable
                            v-model:items-selected="selectedEmployees"
                            :rows-per-page="10"
                            class="mt-5"
                            :headers="headers"
                            :items="employeeEnum.list"
                        />
                    </div>
                    <div class="flex-1 flex-col gap-4 p-2">
                        <div>
                            <label for="requestingOffice" class="text-sm italic font-semibold text-gray-700">Requesting Office</label>
                            <select
                                id="department"
                                v-model="overtime.department_id"
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
                            <label for="requstedBy" class="text-sm italic font-semibold text-gray-700">Date of Overtime</label>
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
                        <div>
                            <label
                                for="small-input"
                                class="flex pt-2 font-medium text-blue-700 dark:text-white italic"
                            >Prepared by:
                            </label>
                            <input
                                id="preparedBy"
                                :value="userData.name"
                                type="text"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled
                            >
                        </div>
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
