<script setup>
import "@vuepic/vue-datepicker/dist/main.css"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { employeeIsSearched, information } = storeToRefs(employee)
const snackbar = useSnackbar()

const filterDate = ref({
    from: null,
    to: null,
    data: [],
})

const showInformation = () => {
    showInformationModal.value = true
}

const getAttendance = async () => {
    try {
        if (filterDate.value.from > filterDate.value.to) {
            snackbar.add({
                type: "warning",
                text: "Date From should be less than Date To."
            })
        } else if (filterDate.value.from <= filterDate.value.to) {
            if (employeeIsSearched.value) {
                await employee.getEmployeeDTR(information.value.id, filterDate.value.from, filterDate.value.to)
                const fetch = information.value.employee_dtr.dtr
                filterDate.value.data = fetch
                // filterDate.value.data = Object.entries(fetch)
                snackbar.add({
                    type: "success",
                    text: employee.successMessage
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
    <div class="shadow-md border border-gray-200 rounded-lg p-4 bg-white mb-3 w-full md:w-3/4">
        <div class="flex w-full mb-4">
            <div class="div">
                <form @submit.prevent="getAttendance" class="w-full grid grid-cols-1 gap-4 grid-cols-3">
                    <div class="div">
                        <label for="date_requested" class="block text-sm font-medium text-gray-900 dark:text-white">Date From:</label>
                        <input v-model="filterDate.from" id="date_requested" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="div">
                        <label for="date_required" class="block text-sm font-medium text-gray-900 dark:text-white">Date To:</label>
                        <input v-model="filterDate.to" id="date_required" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="div flex items-end">
                        <button
                            type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 font-medium text-sm px-2.5 py-2 text-center rounded-lg">
                            <Icon name="ion:search" color="white" class="rounded h-7 w-8 p-1" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div>
            <LayoutPsTableDTR
                :header-columns="headers"
                :actions="actions"
                :datas="filterDate.data"
                @show-table="showInformation"
            />
        </div>
    </div>
</template>
