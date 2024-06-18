<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"

const pan = usePersonelActionNotice()
pan.personelActionNotice.salary_type = "Fixed Rate"
pan.personelActionNotice.hire_source = "Internal"
pan.personelActionNotice.employment_status = "Probationary"
pan.personelActionNotice.work_location = "Office"

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
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >
                    HIRE SOURCE:
                </label>
                <HrmsCommonEmploymentHireSourceSelector v-model="pan.personelActionNotice.hire_source" />
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input-Position"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Position:</label>
                <HrmsCommonPositionSelector
                    id="small-input-Position"
                    v-model="pan.personelActionNotice.designation_position"
                />
            </div>
        </td>
    </tr>
    <tr>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >
                    EMPLOYMENT STATUS:
                </label>
                <HrmsCommonEmploymentStatusSelector v-model="pan.personelActionNotice.employment_status" />
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >SALARY TYPE:
                </label>
                <HrmsCommonEmploymentSalaryTypeSelector v-model="pan.personelActionNotice.salary_type" />
            </div>
        </td>
        <td class="border border-slate-300 p-2">
            <div>
                <label
                    for="salarygradeSel"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >SALARY GRADE:
                </label>
                <HrmsCommonSalaryGradeSelector
                    id="salarygradeSel"
                    v-model="pan.personelActionNotice.salary_grades"
                />
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >
                    WORK LOCATION:
                </label>
                <HrmsCommonEmploymentWorkLocationSelector v-model="pan.personelActionNotice.work_location" />
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="panSection"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Department:</label>
                <HrmsCommonDepartmentSelector
                    id="panSection"
                    v-model="pan.personelActionNotice.section_department_id"
                />
            </div>
        </td>
    </tr>
</template>
