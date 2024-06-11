<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const pan = usePersonelActionNotice()
</script>
<template>
    <tr>
        <td colspan="4">
            <label
                for="small-input"
                class="flex justify-center text-md font-medium text-blue-700 dark:text-white"
            >TRANSFER DATA</label>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Work Location:</label>
                <p>{{ employee.information?.current_employment?.work_location }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
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
</template>
