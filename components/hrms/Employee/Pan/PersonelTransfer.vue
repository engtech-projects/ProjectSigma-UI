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
                >
                    Current Work Location:
                </label>
                <p>
                    {{ employee.information?.current_employment?.work_location }} -
                    <span>{{ employee.information?.current_employment?.employee_department?.department_name }}</span>
                    <span>{{ employee.information?.current_employment?.projects?.project_code }}</span>
                </p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <label
                for="transferDepartment"
                class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
            >
                New Work Location:
            </label>
            <HrmsCommonEmploymentWorkLocationSelector v-model="pan.personelActionNotice.work_location" />

            <template v-if="pan.personelActionNotice.work_location === 'Office'">
                <HrmsCommonDepartmentSelector
                    id="transferDepartment"
                    v-model="pan.personelActionNotice.section_department_id"
                />
            </template>
            <template v-else>
                <template v-for="project, index in pan.personelActionNotice.projects" :key="project.id + 'projectselector'">
                    <div class="flex items-center gap-2">
                        <HrmsCommonProjectSelector
                            v-model="pan.personelActionNotice.projects[index]"
                            :data="project"
                        />
                        <Icon name="iconoir:trash" class="text-2xl text-slate-800 hover:text-blue-500 cursor-pointer" @click="pan.personelActionNotice.projects.splice(index, 1)" />
                    </div>
                </template>
                <Icon name="iconoir:plus" class="text-2xl text-slate-800 hover:text-blue-500 cursor-pointer" @click="pan.personelActionNotice.projects.push(1)" />
            </template>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >
                    Current Salary Type:
                </label>
                <p>{{ employee.information?.current_employment?.salary_type }}</p>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="transferDepartment"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >
                    New Salary Type:
                </label>
                <HrmsCommonEmploymentSalaryTypeSelector v-model="pan.personelActionNotice.salary_type" />
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
</template>
