<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useSalaryGradeStore } from "~/stores/hrms/setup/salarygrade"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const salaryGrade = useSalaryGradeStore()
const employee = useEmployeeInfo()
const { salaryGradeStepList: salaryGradeList } = storeToRefs(salaryGrade)
const pan = usePersonelActionNotice()

</script>
<template>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white p-2"
            >PROMOTION: </label>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >OLD EMPLOYMENT STATUS: </label>
                <p>{{ employee.information.current_employment.position_title }}</p>
            </div>
        </td>
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
                <input id="projectBased" v-model="pan.personelActionNotice.new_employment_status" type="radio" value="projectBased">
                <label
                    for="projectBased"
                    class="text-xs text-gray-900 dark:text-gray-300"
                >PROJECT BASED</label>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >OLD POSITION: </label>
                <p>{{ employee.information.current_employment.position_title }}</p>
            </div>
        </td>
        <td colspan="2">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >NEW POSITION : </label>
                <input id="PromotionPosition" v-model="pan.personelActionNotice.new_position" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text">
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="m-2">
                <label
                    for="PromotionSalaryGrade"
                    class="flex text-sm text-black-700 dark:text-white"
                >OLD SALARY GRADE: </label>
                <template v-if="employee.information.current_employment">
                    <p>Salary Grade {{ employee.information.current_employment.employee_salarygrade.salary_grade_level.salary_grade_level }} - Step {{ employee.information.current_employment.employee_salarygrade.step_name }}</p>
                </template>
            </div>
        </td>
        <td colspan="2">
            <div class="m-2">
                <label
                    for="PromotionSalaryGrade"
                    class="flex text-sm text-black-700 dark:text-white"
                >NEW SALARY GRADE : </label>
                <select
                    id="panSection"
                    v-model="pan.personelActionNotice.new_salary_grades"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                >
                    <option v-for="(salary, index) in salaryGradeList" :key="index" :value="salary.id">
                        Grade {{ salary.salary_grade_level }} - Step {{ salary.step_name }}
                    </option>
                </select>
            </div>
        </td>
    </tr>
</template>
