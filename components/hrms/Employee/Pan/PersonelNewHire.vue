<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useDepartmentStore } from "@/stores/hrms/departments"
// import { useSalaryGradeStore } from "~/stores/hrms/salarygrade";

const pan = usePersonelActionNotice()
const department = useDepartmentStore()
// const salaryGrade = useSalaryGradeStore()
pan.personelActionNotice.salary_type = "Fixed Rate"
pan.personelActionNotice.hire_source = "Internal"
pan.personelActionNotice.new_employment_status = "Probationary"
pan.personelActionNotice.work_location = "Office"
const { departmentList } = storeToRefs(department)

department.getDepartmentList()
</script>
<template>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >EMPLOYEE/NEW HIRE DATA</label>
        </td>
    </tr>
    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >SECTION:</label>
                <select
                    id="panSection"
                    v-model="pan.personelActionNotice.section_department"
                    class="w-full "
                    required
                >
                    <option v-for="(dep, index) in departmentList" :key="index" :value="dep.id">
                        {{ dep.department_name }}
                    </option>
                </select>
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >DESIGNATION:</label>
                <input
                    id="small-input"
                    v-model="pan.personelActionNotice.designation_position"
                    type="text"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >SALARY GRADE:</label>
                <input
                    id="small-input"
                    v-model="pan.personelActionNotice.salary_grades"
                    type="text"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >EMPLOYEE STATUS: </label>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="border border-slate-300 p-2">
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="probationary" v-model="pan.personelActionNotice.new_employment_status" class="" type="radio" value="Probationary">
                <label
                    for="probationary"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >PROBATIONARY</label>
                <input id="regularization" v-model="pan.personelActionNotice.new_employment_status" class="" type="radio" value="Regularization">
                <label
                    for="regularization"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >REGULARIZATION</label>
                <input id="weekly" v-model="pan.personelActionNotice.new_employment_status" class="" type="radio" value="Project Base">
                <label
                    for="weekly"
                    class="text-xs text-gray-900 dark:text-gray-300"
                >WEEKLY</label>
                <input id="projectBased" v-model="pan.personelActionNotice.new_employment_status" type="radio" value="projectBased">
                <label
                    for="projectBased"
                    class="text-xs text-gray-900 dark:text-gray-300"
                >PROJECT BASED</label>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >SALARY: </label>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="border border-slate-300 p-2">
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="fixedRate" v-model="pan.personelActionNotice.salary_type" class="" type="radio" value="Fixed Rate">
                <label
                    for="fixedRate"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >FIXED RATE</label>
                <input id="nonfixedrate" v-model="pan.personelActionNotice.salary_type" class="" type="radio" value="Non Fixed Rate">
                <label
                    for="nonfixedrate"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >NON-FIXED RATE</label>
                <input id="weekly" v-model="pan.personelActionNotice.salary_type" class="" type="radio" value="Weekly">
                <label
                    for="weekly"
                    class="text-xs text-gray-900 dark:text-gray-300"
                >WEEKLY</label>
                <input id="monthly" v-model="pan.personelActionNotice.salary_type" type="radio" value="Monthly">
                <label
                    for="monthly"
                    class="text-xs text-gray-900 dark:text-gray-300"
                >MONTLY</label>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >HIRED SOURCE: </label>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="border border-slate-300 p-2">
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="Internal" v-model="pan.personelActionNotice.hire_source" class="" type="radio" value="Internal">
                <label
                    for="Internal"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >INTERNAL</label>
                <input id="External" v-model="pan.personelActionNotice.hire_source" class="" type="radio" value="External">
                <label
                    for="External"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >EXTERNAL</label>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >WORK LOCATION:  <span class="text-gray-700">{{ pan.personelActionNotice.work_location }}</span> </label>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="border border-slate-300 p-2">
            <div class="md:flex gap-2 space-x-2 p-2">
                <input id="workLocationPMS" v-model="pan.personelActionNotice.work_location" class="" type="radio" value="PMS">
                <label
                    for="workLocationPMS"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >PMS</label>
                <input id="workLocationOffice" v-model="pan.personelActionNotice.work_location" class="" type="radio" value="Office">
                <label
                    for="workLocationOffice"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >OFFICE</label>
                <input id="WorkLocationProjectCode" v-model="pan.personelActionNotice.work_location" class="" type="radio" value="Project Code">
                <label
                    for="WorkLocationProjectCode"
                    class="mr-4 text-xs text-gray-900 dark:text-gray-300"
                >PROJECT CODE</label>
            </div>
        </td>
    </tr>
</template>
