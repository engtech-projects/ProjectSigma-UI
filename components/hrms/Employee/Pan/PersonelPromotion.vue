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
            >
                PROMOTION
            </label>
        </td>
    </tr>
    <tr class="border border-slate-300 p-2">
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    OLD EMPLOYMENT STATUS:
                </label>
                <p>{{ employee.information?.current_employment?.employment_status }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    NEW EMPLOYMENT STATUS:
                </label>
                <HrmsCommonEmploymentStatusSelector v-model="pan.personelActionNotice.employment_status" />
            </div>
        </td>
    </tr>
    <tr class="border border-slate-300 p-2">
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    OLD POSITION:
                </label>
                <p>{{ employee.information?.current_employment?.position.name }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    for="PromotionPosition"
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    NEW POSITION :
                </label>
                <HrmsCommonPositionSelector
                    id="PromotionPosition"
                    v-model="pan.personelActionNotice.designation_position"
                />
            </div>
        </td>
    </tr>
    <tr class="border border-slate-300 p-2">
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    for="PromotionSalaryGrade"
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    OLD SALARY GRADE:
                </label>
                <template v-if="employee.information.current_employment">
                    <p>Salary Grade {{ employee.information.current_employment.employee_salarygrade.salary_grade_level.salary_grade_level }} - Step {{ employee.information.current_employment.employee_salarygrade.step_name }}</p>
                </template>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    for="PromotionSalaryGrade"
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    NEW SALARY GRADE :
                </label>
                <HrmsCommonSalaryGradeSelector
                    id="PromotionSalaryGrade"
                    v-model="pan.personelActionNotice.salary_grades"
                />
            </div>
        </td>
    </tr>
    <tr class="border border-slate-300 p-2">
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    for="PromotionSalaryType"
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    OLD SALARY TYPE:
                </label>
                <p>{{ employee.information?.current_employment?.salary_type }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300">
            <div class="m-2">
                <label
                    class="flex text-sm text-black-700 dark:text-white"
                >
                    NEW SALARY TYPE:
                </label>
                <HrmsCommonEmploymentSalaryTypeSelector v-model="pan.personelActionNotice.salary_type" />
            </div>
        </td>
    </tr>
</template>
