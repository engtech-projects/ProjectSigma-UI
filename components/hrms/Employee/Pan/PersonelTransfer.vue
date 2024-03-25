<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
import { useDepartmentStore } from "@/stores/hrms/departments"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const pan = usePersonelActionNotice()
const department = useDepartmentStore()
const employee = useEmployeeInfo()
const { departmentList } = storeToRefs(department)
pan.personelActionNotice.section_department_id = employee.information.employee_internal.department_id

</script>
<template>
    <tr>
        <td>
            <label
                for="small-input"
                class="flex text-md font-medium text-blue-700 dark:text-white"
            >TRANSFER DATA</label>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >From: (Sec./Loc.):</label>
                <select
                    id="panSection"
                    v-model="pan.personelActionNotice.section_department_id"
                    class="w-full "
                    required
                >
                    <option v-for="(dep, index) in departmentList" :key="index" :value="dep.section_department_id">
                        {{ dep.department_name }}
                    </option>
                </select>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Approving Supervisor</label>
                <input
                    id="small-input"
                    type="text"
                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
            </div>
        </td>
    </tr>

    <tr>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >To: (Sec./Loc.):</label>
                <select
                    id="panSection"
                    v-model="pan.personelActionNotice.new_section"
                    class="w-full "
                    required
                >
                    <option v-for="(dep, index) in departmentList" :key="index" :value="dep.section_department_id">
                        {{ dep.department_name }}
                    </option>
                </select>
            </div>
        </td>
        <td colspan="2" class="border border-slate-300 p-2">
            <div>
                <label
                    for="small-input"
                    class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white"
                >Approving Supervisor</label>
                <input
                    id="small-input"
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
