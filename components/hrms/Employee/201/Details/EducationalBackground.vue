<script setup>
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()
</script>
<template>
    <form action="">
        <label for="employeeeduc" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Education</label>
        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tbody>
                <tr v-for="(schl, index) in employee.information.employee_education_elementary" :key="index">
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_type" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">
                            TYPE OF SCHOOL
                        </p>
                        <select id="elementary_type" name="elementary_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="elementary">
                                ELEMENTARY
                            </option>
                        </select>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            NAME OF SCHOOL
                        </p>
                        <div class="flex">
                            <input id="elementary_name" v-model="schl.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            DEGREE EARNED
                        </p>
                        <div class="flex">
                            <input id="elementary_degree_earned_of_school" v-model="schl.degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <p for="elementary_period_attendance_from" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                                INCLUSIVE DATES
                            </p>
                            <div class="flex justify-center">
                                <input id="elementary_period_attendance_from" v-model="schl.period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="elementary_period_attendance_to" v-model="schl.period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_honors_received" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            HONORS RECEIVED
                        </p>
                        <div class="flex">
                            <input id="elementary_honors_received" v-model="schl.honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr v-for="(schl, index) in employee.information.employee_education_secondary" :key="index">
                    <td class="border border-slate-300 p-1">
                        <p for="secondary_type" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">
                            TYPE OF SCHOOL
                        </p>
                        <select id="secondary_type" name="secondary_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="secondary">
                                SECONDARY
                            </option>
                        </select>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="secondary_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            NAME OF SCHOOL
                        </p>
                        <div class="flex">
                            <input id="secondary_name" v-model="schl.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="secondary_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            DEGREE EARNED
                        </p>
                        <div class="flex">
                            <input id="secondary_degree_earned_of_school" v-model="schl.degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <p for="secondary_period_attendance_from" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                                INCLUSIVE DATES
                            </p>
                            <div class="flex justify-center">
                                <input id="secondary_period_attendance_from" v-model="schl.period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="secondary_period_attendance_to" v-model="schl.period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="secondary_honors_received" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            HONORS RECEIVED
                        </p>
                        <div class="flex">
                            <input id="secondary_honors_received" v-model="schl.secondary_honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr v-for="(schl, index) in employee.information.employee_education_college" :key="index">
                    <td class="border border-slate-300 p-1">
                        <p for="college_type" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">
                            TYPE OF SCHOOL
                        </p>
                        <select id="college_type" name="college_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="college">
                                COLLEGE
                            </option>
                        </select>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="college_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            NAME OF SCHOOL
                        </p>
                        <div class="flex">
                            <input id="college_name" v-model="schl.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="college_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            DEGREE EARNED
                        </p>
                        <div class="flex">
                            <input id="college_degree_earned_of_school" v-model="schl.degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <p for="college_period_attendance_from" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                                INCLUSIVE DATES
                            </p>
                            <div class="flex justify-center">
                                <input id="college_period_attendance_from" v-model="schl.period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="college_period_attendance_to" v-model="schl.period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="scollege_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            HONORS RECEIVED
                        </p>
                        <div class="flex">
                            <input id="college_degree_earned_of_school" v-model="schl.college_degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr v-for="(schl, index) in employee.information.employee_education_vocationalcourse" :key="index">
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
                            <input id="vocationalcourse_name" v-model="schl.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="vocationalcourse_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            DEGREE EARNED
                        </p>
                        <div class="flex">
                            <input id="vocationalcourse_degree_earned_of_school" v-model="schl.degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <p for="vocationalcourse_period_attendance_from" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                                INCLUSIVE DATES
                            </p>
                            <div class="flex justify-center">
                                <input id="vocationalcourse_period_attendance_from" v-model="schl.period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="vocationalcourse_period_attendance_to" v-model="schl.period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="vocationalcourse_honors_received" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            HONORS RECEIVED
                        </p>
                        <div class="flex">
                            <input id="vocationalcourse_honors_received" v-model="schl.vocationalcourse_honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <p class="flex-1 text-[11px] w-32 font-medium text-gray-900 dark:text-white">
                                MASTER THESIS
                            </p>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="master_title" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="master_title" v-model="employee.information.masterstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="masters_date" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="masters_date" v-model="employee.information.masterstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <p class="flex-1 text-[11px] w-full font-medium text-gray-900 dark:text-white">
                                DOCTOR DISSERTATION
                            </p>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="doctor_title" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="doctor_title" v-model="employee.information.doctorstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="doctor_date" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="doctor_date" v-model="employee.information.doctorstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <p class="block text-[11px] w-full font-medium text-gray-900 dark:text-white">
                                PROFESSIONAL LICENSE (e.g, CPA, RN, etc.)
                            </p>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="proflicence_title" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="proflicence_title" v-model="employee.information.professionalstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="proflicence_date" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="proflicence_date" v-model="employee.information.professionalstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>
