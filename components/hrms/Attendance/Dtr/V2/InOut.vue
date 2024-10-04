<script setup>
import "@vuepic/vue-datepicker/dist/main.css"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { useMyDtrStore } from "@/stores/hrms/attendance/dtr"

const employee = useEmployeeInfo()
const dtrStore = useMyDtrStore()

const { employeeIsSearched, information } = storeToRefs(employee)
const { getEmployeeDTRv2Data } = storeToRefs(dtrStore)

const snackbar = useSnackbar()

const getAttendance = async () => {
    try {
        getEmployeeDTRv2Data.value.params.employee_id = information.value.id
        if (employeeIsSearched.value) {
            await dtrStore.getEmployeeDTRV2()
            snackbar.add({
                type: "success",
                text: getEmployeeDTRv2Data.value.successMessage
            })
        } else {
            snackbar.add({
                type: "warning",
                text: "Please select a Employee."
            })
        }
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}

</script>
<template>
    <LayoutBoards :loading="getEmployeeDTRv2Data.isLoading">
        <div class="flex w-full mb-4">
            <div class="div">
                <form class="w-full grid grid-cols-2 gap-4 md:grid-cols-3 p-2" @submit.prevent="getAttendance">
                    <div class="div">
                        <label for="date_requested" class="block text-sm font-medium text-gray-900 dark:text-white">Date From:</label>
                        <input id="date_requested" v-model="getEmployeeDTRv2Data.params.cutoff_start" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="div">
                        <label for="date_required" class="block text-sm font-medium text-gray-900 dark:text-white">Date To:</label>
                        <input id="date_required" v-model="getEmployeeDTRv2Data.params.cutoff_end" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
            <HrmsAttendanceDtrV2AttendanceTable />
        </div>
        <p v-if="useCheckAccessibility([AccessibilityTypes.admin])">
            Having Problems?
            <NuxtLink to="/hrms/attendance/dtr" class="text-blue-500 mouse-pointer">
                Try Version 1
            </NuxtLink>
        </p>
    </LayoutBoards>
</template>
