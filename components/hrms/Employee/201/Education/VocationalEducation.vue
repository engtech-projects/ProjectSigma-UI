<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const updateEmployeeEducation = () => {
    return true
}
const { information, editable } = storeToRefs(employee)
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Education Background
        </label>
    </div>
    <table class="w-full border-collapse border border-slate-400 table-fixed">
        <tbody>
            <tr>
                <td class="border border-slate-300 p-1">
                    <p for="vocational_type" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">
                        TYPE OF SCHOOL
                    </p>
                    <select id="vocational_type" name="vocational_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                        <option value="vocational">
                            VOCATIONAL
                        </option>
                    </select>
                </td>
                <td class="border border-slate-300 p-1">
                    <p for="vocationalcourse_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                        NAME OF SCHOOL
                    </p>
                    <div class="flex">
                        <input id="vocationalcourse_name" v-model="information.employee_education_vocationalcourse.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <p for="vocationalcourse_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                        DEGREE EARNED
                    </p>
                    <div class="flex">
                        <input id="vocationalcourse_degree_earned_of_school" v-model="information.employee_education_vocationalcourse.degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300">
                    <div class="p-1">
                        <p for="vocationalcourse_period_attendance_from" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            INCLUSIVE DATES
                        </p>
                        <div class="flex justify-center">
                            <input id="vocationalcourse_period_attendance_from" v-model="information.employee_education_vocationalcourse.period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            -
                            <input id="vocationalcourse_period_attendance_to" v-model="information.employee_education_vocationalcourse.period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <p for="vocationalcourse_honors_received" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                        HONORS RECEIVED
                    </p>
                    <div class="flex">
                        <input id="vocationalcourse_honors_received" v-model="information.employee_education_vocationalcourse.vocationalcourse_honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td v-if="editable" class="border border-slate-300 p-1 justify-center">
                    <div class="w-full flex gap-2">
                        <button
                            v-if="!information.employee_education_vocationalcourse.length > 0"
                            class=" bg-green-600 text-white w-7 h-7"
                            @click="updateEmployeeEducation()"
                        >
                            <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button
                            v-else
                            class=" bg-yellow-400 text-white w-7 h-7"
                            @click="updateEmployeeEducation()"
                        >
                            <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button
                            v-if="information.employee_education_vocationalcourse.length > 0"
                            class=" bg-red-600 text-white w-7 h-7"
                            @click="updateEmployeeEducation()"
                        >
                            <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
