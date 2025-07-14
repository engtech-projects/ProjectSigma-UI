<script setup>
import "@vuepic/vue-datepicker/dist/main.css"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useMyDtrStore } from "@/stores/hrms/attendance/dtr"

const employee = useEmployeeInfo()
const dtrStore = useMyDtrStore()

const { employeeIsSearched, information } = storeToRefs(employee)
const { employee_dtr: employeeDtr } = storeToRefs(dtrStore)

const snackbar = useSnackbar()
const loading = ref(false)
const date = new Date()
const y = date.getFullYear()
const m = date.getMonth()
const defaultFrom = new Date(y, m, 1)
const defaultTo = new Date(date.getFullYear(), date.getMonth() + 1, 0)
const filterDate = ref({
    from: dateToString(defaultFrom),
    to: dateToString(defaultTo),
    data: [],
    keys: [],
})

const showInformation = () => {
    showInformationModal.value = true
}

watch(information, () => {
    dtrStore.$reset()
})

const getAttendance = async () => {
    loading.value = true
    try {
        if (filterDate.value.from > filterDate.value.to) {
            snackbar.add({
                type: "warning",
                text: "Date From should be less than Date To."
            })
        } else if (filterDate.value.from <= filterDate.value.to) {
            if (employeeIsSearched.value) {
                await dtrStore.getEmployeeDTR(information.value.id, filterDate.value.from, filterDate.value.to)
                snackbar.add({
                    type: "success",
                    text: dtrStore.successMessage
                })
            } else {
                snackbar.add({
                    type: "warning",
                    text: "Please select a Employee."
                })
            }
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    } finally {
        loading.value = false
    }
}

const actions = {
    showTable: true,
}

const headers = [
    { name: "Date", id: "date" },
    { name: "Designation / Project Code ", id: "email" },
    { name: "IN.", id: "mobile_number" },
    { name: "OUT", id: "company" },
    { name: "IN", id: "stakeholder_type" },
    { name: "OUT", id: "stakeholder_type" },
    { name: "IN", id: "stakeholder_type" },
    { name: "OUT", id: "stakeholder_type" },
]

</script>
<template>
    <LayoutBoards :loading="loading">
        <div class="flex w-full mb-4">
            <div class="div">
                <form class="w-full grid grid-cols-2 gap-4 md:grid-cols-3 p-2" @submit.prevent="getAttendance">
                    <div class="div">
                        <label for="date_requested" class="block text-sm font-medium text-gray-900 dark:text-white">Date From:</label>
                        <input id="date_requested" v-model="filterDate.from" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="div">
                        <label for="date_required" class="block text-sm font-medium text-gray-900 dark:text-white">Date To:</label>
                        <input id="date_required" v-model="filterDate.to" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="div flex items-end">
                        <button
                            type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-2.5 py-2 text-center rounded-lg"
                        >
                            <Icon name="ion:search" color="white" class="rounded h-7 w-8 p-1" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div>
            <HrmsAttendanceDtrV1AttendanceTable
                :header-columns="headers"
                :actions="actions"
                :schedule="dtrStore.dtrUniqueSchedules"
                :overtime="dtrStore.dtrUniqueOvertime"
                :datas="employeeDtr"
                :period="filterDate"
                @show-table="showInformation"
            />
        </div>
        <p v-if="useCheckAccessibility([AccessibilityTypes.admin])">
            This is an old Version.
            <NuxtLink to="/hrms/attendance/dtr-v2" class="text-blue-500 mouse-pointer">
                Use Version 2
            </NuxtLink>
        </p>
    </LayoutBoards>
</template>
