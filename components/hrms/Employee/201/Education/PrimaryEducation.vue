<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const snackbar = useSnackbar()
const boardLoading = ref(false)

const employee = useEmployeeInfo()
const { information, editable } = storeToRefs(employee)
const updateEmployeeSchool = async (id, params) => {
    boardLoading.value = true
    params.type = "elementary"
    try {
        await employee.updateEmployeeSchool(id, params)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
        boardLoading.value = false
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
        boardLoading.value = false
    }
}
const saveEmployeeSchool = async (params) => {
    boardLoading.value = true
    params.employee_id = employee.information.id
    params.type = "elementary"
    try {
        await employee.saveEmployeeSchool(params)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
        boardLoading.value = false
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
        boardLoading.value = false
    }
}

const deleteEmployeeSchool = async (id) => {
    boardLoading.value = true
    try {
        await employee.updateEmployeeInformation(id)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
        boardLoading.value = false
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
        boardLoading.value = false
    }
}
const addParams = () => {
    information.value.employee_education_elementary = {
        id: null,
        name: null,
        education: null,
        period_attendance_to: null,
        period_attendance_from: null,
        year_graduated: null,
        type: "elementary",
        honors_received: null,
        employee_id: information.value.id
    }
}
addParams()
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee elementary Education
        </label>
    </div>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tbody>
                <tr v-if="information.employee_education_elementary">
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            NAME OF SCHOOL
                        </p>
                        <div class="flex">
                            <input id="elementary_name" v-model="information.employee_education_elementary.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            DEGREE EARNED
                        </p>
                        <div class="flex">
                            <input id="elementary_degree_earned_of_school" v-model="information.employee_education_elementary.degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <p for="elementary_period_attendance_from" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                                INCLUSIVE DATES
                            </p>
                            <div class="flex justify-center">
                                <input id="elementary_period_attendance_from" v-model="information.employee_education_elementary.period_attendance_from" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="elementary_period_attendance_to" v-model="information.employee_education_elementary.period_attendance_to" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_honors_received" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            HONORS RECEIVED
                        </p>
                        <div class="flex">
                            <input id="elementary_honors_received" v-model="information.employee_education_elementary.honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_year_graduated" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            YEAR GRADUATED
                        </p>
                        <div class="flex">
                            <input id="elementary_year_graduated" v-model="information.employee_education_elementary.year_graduated" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td v-if="editable" class="border border-slate-300 p-1 justify-center">
                        <div class="w-full flex gap-2">
                            <button
                                v-if="!information.employee_education_elementary.id"
                                class=" bg-green-600 text-white w-7 h-7"
                                @click="saveEmployeeSchool(information.employee_education_elementary)"
                            >
                                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-else
                                class=" bg-yellow-400 text-white w-7 h-7"
                                @click="updateEmployeeSchool(information.employee_education_elementary.id, information.employee_education_elementary)"
                            >
                                <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-if="information.employee_education_elementary.id"
                                class=" bg-red-600 text-white w-7 h-7"
                                @click="deleteEmployeeSchool(information.employee_education_elementary.id)"
                            >
                                <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                        </div>
                    </td>
                </tr>
                <tr v-else>
                    <div v-if="!editable">
                        <p class="p-2 text-lg text-center">
                            No elementary Information
                        </p>
                    </div>
                    <div v-else>
                        <button
                            class=" bg-green-600 text-white w-8 h-8"
                            @click="addParams()"
                        >
                            <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </div>
                </tr>
            </tbody>
        </table>
    </LayoutBoards>
</template>
