<script setup>
import { useEmployeeInfo } from "~/stores/hrms/employee"
import { useApprovalStore } from "~/stores/hrms/setup/approvals"
// import { useLeaveStore } from "@/stores/hrms/setup/leaves"
import { useLeaveRequest, EMPLOYEE_WITH_PAY, EMPLOYEE_WITHOUT_PAY, EMPLOYEE_APPROVAL_REQ } from "~/stores/hrms/leaveRequest"

// const leaves = useLeaveStore()
const selectType = ref("")
const employee = useEmployeeInfo()
const approval = useApprovalStore()
const leaveRequest = useLeaveRequest()
leaveRequest.payload.approvals = await approval.getApprovalByName(EMPLOYEE_APPROVAL_REQ)
const snackbar = useSnackbar()
const boardLoading = ref(false)

// const headerss = [
//     { text: "LEAVE TYPE", value: "credits" },
//     { text: "EARNED", value: "earned" },
//     { text: "USED", value: "used" },
//     { text: "BALANCE", value: "balance" },
// ]
// const items = ref([
//     {
//         credits: "Vacation Leave",
//         earned: "",
//         used: "",
//         balance: "",
//     },
// ])

const headers = [
    { name: "Leave Type", id: "leavename" },
    { name: "Amount of Leaves", id: "total_credits" },
    { name: "USED", id: "used" },
    { name: "BALANCE", id: "balance" },
]

// const setEmployee = (emp) => {
//     leaveRequest.payload.employee_id = employee.getLeaveCredits(emp.id)
// }
const setEmployee = async (emp) => {
    const leaveCredits = await employee.getLeaveCredits(emp.id)
    leaveRequest.payload.employee_id = emp.id
    leaveRequest.payload.leave_credits = leaveCredits
}

const totalDates = computed(() => {
    if (leaveRequest.payload.date_of_absence_to && leaveRequest.payload.date_of_absence_from) {
        leaveRequest.payload.number_of_days = 1
        const dateStart = new Date(leaveRequest.payload.date_of_absence_from)
        const dateEnd = new Date(leaveRequest.payload.date_of_absence_to)
        const dsMin = dateStart.setMinutes(dateStart.getMinutes() - dateStart.getTimezoneOffset())
        const deMin = dateEnd.setMinutes(dateEnd.getMinutes() - dateEnd.getTimezoneOffset())
        leaveRequest.payload.number_of_days = (deMin - dsMin) / (24 * 60 * 60 * 1000) + 1
    }
})

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
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="Leave Application Form" class="mt-5 edit-item w-full max-w-full">
        <div class="w-full p-2">
            <div class="mt-5 grid gap-6 mb-6 md:grid-cols-2">
                <div class="mb-6">
                    <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <SearchBar @search-changed="setEmployee" />
                </div>
                <div class="mb-6">
                    <label for="department" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                    <p>{{ employee.information?.employee_internal[0]?.position?.name ?? "No Position" }}</p>
                </div>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <HrmsCommonDepartmentProjectSelector
                    v-model:select-type="selectType"
                    v-model:department-id="leaveRequest.payload.department_id"
                    v-model:project-id="leaveRequest.payload.project_id"
                />
                <div class="mb-6">
                    <label for="date_filed" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Filed</label>
                    <input id="date_filed" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required>
                </div>
            </div>
            <div class="w-full">
                <div class="w-full">
                    <label for="" class="text-xl font-semibold text-gray-900">LEAVE AVAILMENT</label>
                    <div class="flex gap-5">
                        <div v-for="(leaveType, index2) in employee.information?.leaveCredits" :key="index2">
                            <input
                                id="leaveType"
                                v-model="leaveRequest.payload.leave_id"
                                :value="leaveType.id"
                                type="radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label :for="'leaveType' + index" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {{ leaveType.leave_name }}
                            </label>
                        </div>
                    </div>
                    <div class="mt-4 mb-2">
                        <LayoutFormPsTextInput v-model="leaveRequest.payload.reason_for_absence" title="REASONS/REMARKS" placeholder="remarks" />
                    </div>
                    <div class="mt-4 grid gap-3 mb-4 md:grid-cols-3">
                        <div class="mb-2">
                            <LayoutFormPsDateInput v-model="leaveRequest.payload.date_of_absence_from" title="Days from" @change="totalDates" />
                        </div>
                        <div>
                            <LayoutFormPsDateInput v-model="leaveRequest.payload.date_of_absence_to" title="Days to" @change="totalDates" />
                        </div>
                        <div>
                            <LayoutFormPsNumberInput v-model="leaveRequest.payload.number_of_days" title="No. of Days:" />
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <div class="mb-6">
                            <input
                                id="emp_with_pay"
                                v-model="leaveRequest.payload.with_pay"
                                :value="EMPLOYEE_WITH_PAY"
                                type="radio"
                                name="emp_with_pay"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label for="emp_with_pay" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WITH PAY</label>
                        </div>
                        <div class="mb-6">
                            <input
                                id="emp_without_pay"
                                v-model="leaveRequest.payload.with_pay"
                                :value="EMPLOYEE_WITHOUT_PAY"
                                type="radio"
                                name="emp_without_pay"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label for="emp_without_pay" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WITHOUT PAY</label>
                        </div>
                    </div>
                </div>
                <div class="w-full p-2">
                    <HrmsLeaveApproval />
                </div>
                <!-- <div class="w-full">
                    <label for="" class="text-xl font-semibold text-gray-900">EMPLOYEE'S LEAVE RECORD (HRD use only)</label>
                    <EasyDataTable
                        id="employee_leave_table"
                        class="mt-5"
                        :headers="headerss"
                        :items="items"
                        :datas="leaveList"
                    />
                </div> -->
                <div class="w-full">
                    <label for="" class="text-xl font-semibold text-gray-900">EMPLOYEE'S LEAVE RECORD (HRD use only)</label>
                    <pre>{{ employee.information?.leaveCredits }}</pre>
                    <LayoutPsTable :header-columns="headers" :datas="employee.information?.leaveCredits" />
                </div>
            </div>
            <div class="max-w-full flex flex-row-reverse mt-5">
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="submitAdd">
                    Add
                </button>
            </div>
        </div>
    </LayoutBoards>
</template>

<style scoped>
#employee_leave_table .vue3-easy-data-table__footer{
    display: none !important;
}
</style>
