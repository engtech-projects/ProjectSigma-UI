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
                TRANSFER DATA
            </label>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Current Work Location:</label>
                <p>{{ employee.information?.current_employment?.work_location }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <label
                for="transferDepartment"
                class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
            >New Work Location:</label>
            <HrmsCommonEmploymentWorkLocationSelector v-model="pan.personelActionNotice.work_location" />
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Current Department:</label>
                <p>{{ employee.information?.current_employment?.employee_department.department_name }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="transferDepartment"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >New Department:</label>
                <HrmsCommonDepartmentSelector
                    id="transferDepartment"
                    v-model="pan.personelActionNotice.section_department_id"
                />
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Current Salary Type:</label>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <HrmsCommonEmploymentSalaryTypeSelector v-model="pan.personelActionNotice.salary_type" />
            </div>
        </td>
    </tr>
</template>
