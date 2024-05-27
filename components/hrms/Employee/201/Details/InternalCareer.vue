<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const { information: employeeInformation } = storeToRefs(employee)
</script>
<template>
    <div>
        <label for="company_info" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">
            Internal Work Experience/History
        </label>
        <form v-for="(emprecord, index) in employeeInformation.employee_internal" :key="index" action="">
            <table class="w-full border-collapse border border-slate-400 table-fixed">
                <tbody>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">EMPLOYMENT DATES</label>
                            <div class="flex-1 justify-center items-center gap-2">
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                                    <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {{ emprecord.date_from }}
                                    </p>
                                </div>
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                                    <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {{ emprecord.date_to }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">SALARY</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                Salary Grade {{ emprecord.employee_salarygrade?.salary_grade_level.salary_grade_level }} - Step {{ emprecord.employee_salarygrade?.step_name }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Immediate Supervisor</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.immediate_supervisor }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Position</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.position.name }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Employment Status</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.employment_status }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Hire Source</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.hire_source }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Work Location</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.work_location }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Department</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                "{{ emprecord.employee_department?.department_name }}"
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>
