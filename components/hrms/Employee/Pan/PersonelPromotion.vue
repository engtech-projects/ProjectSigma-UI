<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const pan = usePersonelActionNotice()

</script>
<template>
    <tr class="border border-slate-300 p-2">
        <td colspan="4">
            <label
                for="small-input"
                class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
            >PROMOTION</label>
        </td>
    </tr>
    <tr class="border border-slate-300 p-2">
        <td colspan="1">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >OLD EMPLOYMENT STATUS: </label>
                <p>{{ employee.information?.current_employment?.employment_status }}</p>
            </div>
        </td>
        <td colspan="3" class="border border-slate-300 p-2">
            <div class="flex flex-row gap-2 space-x-2 p-2">
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
    <tr class="border border-slate-300 p-2">
        <td colspan="2">
            <div class="m-2 slate-300 p-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >OLD POSITION: </label>
                <p>{{ employee.information?.current_employment?.position.name }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div class="m-2">
                <label
                    for="PromotionPosition"
                    class="flex text-sm text-black-700 dark:text-white"
                >NEW POSITION : </label>
                <HrmsCommonPositionSelector
                    id="PromotionPosition"
                    v-model="pan.personelActionNotice.new_position"
                />
            </div>
        </td>
    </tr>
    <tr class="border border-slate-300 p-2">
        <td colspan="2" class="border border-slate-300 p-2">
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
        <td colspan="2" class="border border-slate-300 p-2">
            <div class="m-2">
                <label
                    for="PromotionSalaryGrade"
                    class="flex text-sm text-black-700 dark:text-white"
                >NEW SALARY GRADE : </label>
                <HrmsCommonSalaryGradeSelector
                    id="PromotionSalaryGrade"
                    v-model="pan.personelActionNotice.new_salary_grades"
                />
            </div>
        </td>
    </tr>
</template>
