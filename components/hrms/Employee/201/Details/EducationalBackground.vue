<script setup>
import { useEmployeeInfo } from "@/stores/employee"

const employee = useEmployeeInfo()
</script>
<template>
    <form action="">
        <label for="employeeeduc" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Education</label>
        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tbody>
                <tr v-for="(schl, index) in employee.information.employee_education_elementary" :key="index">
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">TYPE OF SCHOOL</label>
                        <select id="schl_type" name="schl_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="elementary">
                                ELEMENTARY
                            </option>
                        </select>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF SCHOOL</label>
                        <div class="flex">
                            <input v-model="schl.elementary_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DEGREE EARNED</label>
                        <div class="flex">
                            <input v-model="schl.elementary_degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">INCLUSIVE DATES</label>
                            <div class="flex justify-center">
                                <input id="inclusive_date" v-model="schl.elementary_period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="inclusive_date" v-model="schl.elementary_period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HONORS RECEIVED</label>
                        <div class="flex">
                            <input v-model="schl.elementary_honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr v-for="(schl, index) in employee.information.employee_education_secondary" :key="index">
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">TYPE OF SCHOOL</label>
                        <select id="schl_type" name="schl_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="secondary">
                                SECONDARY
                            </option>
                        </select>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF SCHOOL</label>
                        <div class="flex">
                            <input v-model="schl.secondary_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DEGREE EARNED</label>
                        <div class="flex">
                            <input v-model="schl.secondary_degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">INCLUSIVE DATES</label>
                            <div class="flex justify-center">
                                <input id="inclusive_date" v-model="schl.secondary_period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="inclusive_date" v-model="schl.secondary_period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HONORS RECEIVED</label>
                        <div class="flex">
                            <input v-model="schl.secondary_honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr v-for="(schl, index) in employee.information.employee_education_college" :key="index">
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">TYPE OF SCHOOL</label>
                        <select id="schl_type" name="schl_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="college">
                                COLLEGE
                            </option>
                        </select>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF SCHOOL</label>
                        <div class="flex">
                            <input v-model="schl.college_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DEGREE EARNED</label>
                        <div class="flex">
                            <input v-model="schl.college_degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">INCLUSIVE DATES</label>
                            <div class="flex justify-center">
                                <input id="inclusive_date" v-model="schl.college_period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="inclusive_date" v-model="schl.college_period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HONORS RECEIVED</label>
                        <div class="flex">
                            <input v-model="schl.college_degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr v-for="(schl, index) in employee.information.employee_education_vocationalcourse" :key="index">
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="flex-1 mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">TYPE OF SCHOOL</label>
                        <select id="schl_type" name="schl_type" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                            <option value="vocational">
                                VOCATIONAL
                            </option>
                        </select>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF SCHOOL</label>
                        <div class="flex">
                            <input v-model="schl.vocationalcourse_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DEGREE EARNED</label>
                        <div class="flex">
                            <input v-model="schl.vocationalcourse_degree_earned_of_school" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">INCLUSIVE DATES</label>
                            <div class="flex justify-center">
                                <input id="inclusive_date" v-model="schl.vocationalcourse_period_attendance_from" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                -
                                <input id="inclusive_date" v-model="schl.vocationalcourse_period_attendance_to" type="date" class="block w-36 p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HONORS RECEIVED</label>
                        <div class="flex">
                            <input v-model="schl.vocationalcourse_honors_received" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="flex-1 text-[11px] w-32 font-medium text-gray-900 dark:text-white">MASTER THESIS</label>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="master_title" v-model="employee.information.masterstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="dob" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="masters_date" v-model="employee.information.masterstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="flex-1 text-[11px] w-full font-medium text-gray-900 dark:text-white">DOCTOR DISSERTATION</label>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="doctor_title" v-model="employee.information.doctorstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="dob" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="doctor_date" v-model="employee.information.doctorstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block text-[11px] w-full font-medium text-gray-900 dark:text-white">PROFESSIONAL LICENSE (e.g, CPA, RN, etc.)</label>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="proflicence_title" v-model="employee.information.professionalstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="dob" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="proflicence_date" v-model="employee.information.professionalstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <!-- <td class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block text-[11px] w-full font-medium text-gray-900 dark:text-white">SPECIAL SKILLS</label>
                        </div>
                    </td> -->
                    <td colspan="4" class="border border-slate-300 p-1">
                        <div>
                            <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white" />
                            <input id="special_skills" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(PLEASE SPECIFY, eg., computer, driving, etc.)">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>
