<script setup>
import { useEmployeeInfo } from "~/stores/hrms/employee"
// import { useApprovalStore } from "~/stores/hrms/setup/approvals"
// import { useLeaveStore } from "@/stores/hrms/setup/leaves"
// const leaves = useLeaveStore()
const selectType = ref("")
const employee = useEmployeeInfo()
// const approval = useApprovalStore()
const snackbar = useSnackbar()
const boardLoading = ref(false)
const { information: employeeinfo } = storeToRefs(employee)

const headers = [
    { name: "Leave Type", id: "leave_name" },
    { name: "Amount of Leaves", id: "credits" },
    { name: "USED", id: "used" },
    { name: "BALANCE", id: "balance" },
]

const setEmployee = (emp) => {
    console.log(emp)
}
// const setEmployee = async (emp) => {
//     leaveRequest.payload.employee_id = emp.id
//     await employee.getLeaveCredits(emp.id)
// }

const submitAdd = async () => {
    try {
        boardLoading.value = true
        await leaveRequest.createRequest()
        if (leaveRequest.successMessage) {
            snackbar.add({
                type: "success",
                text: leaveRequest.successMessage
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        leaveRequest.clearMessages()
        boardLoading.value = false
        leaveRequest.allLeaves()
        leaveRequest.allApprovals()
    }
}
</script>

<template>
    <LayoutBoards title="Failure to Log Form" class="mt-5 edit-item w-full max-w-full">
        <form @submit.prevent="submitAdd">
            <div class="w-full p-2">
                <div class="mt-5 grid gap-6 mb-2 md:grid-cols-2">
                    <div class="mb-2">
                        <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <SearchBar @search-changed="setEmployee" />
                    </div>
                    <div class="mb-2 w-full">
                        <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Log Type</label>
                        <select name="" id="" class="border border-gray-500 rounded-md w-full">
                            <option value="In">
                                In
                            </option>
                            <option value="Out">
                                Out
                            </option>
                        </select>
                        <!-- <p>{{ employeeinfo.current_employment?.position?.name ?? "No Position" }}</p> -->
                    </div>
                </div>
                <div class="grid gap-6 mb-2 md:grid-cols-2">
                    <HrmsCommonDepartmentProjectSelector
                        v-if="1==2"
                        v-model:select-type="selectType"
                        v-model:department-id="leaveRequest.payload.department_id"
                        v-model:project-id="leaveRequest.payload.project_id"
                    />
                    <div class="mb-2">
                        <label for="date_filed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                        <input id="date_filed" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                    </div>
                    <div class="mb-2">
                        <label for="date_filed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Time</label>
                        <input id="date_filed" type="time" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                    </div>
                </div>
                <!-- <div class="mt-4 mb-2 w-full mb-6">
                    <LayoutFormPsTextInput v-model="leaveRequest.payload.reason_for_absence" title="REASONS/REMARKS" placeholder="remarks" />
                </div> -->
                <div class="w-full">
                    <div class="w-full">
                        <label for="" class="text-xl font-semibold text-gray-900">APPROVALS</label>
                    </div>
                    <div class="w-full p-2">
                        <HrmsLeaveApproval />
                    </div>
                    <div class="w-full">
                        <label for="" class="text-xl font-semibold text-gray-900">EMPLOYEE'S LEAVE RECORD (HRD use only)</label>
                        <!-- <pre>{{ employeeinfo }}</pre> -->
                        <LayoutPsTable :header-columns="headers" :datas="employeeinfo.leaveCredits" />
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
