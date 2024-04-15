<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { allEmployeeEnum, projectEnum, departmentEnum } = storeToRefs(enums)
const model = defineModel({ required: true, type: Array<Number> })
</script>
<template>
    <div>
        <select v-model="allEmployeeEnum.params.filterType">
            <option value="Project">
                Project
            </option>
            <option value="Department">
                Department
            </option>
        </select>
        <select v-if="allEmployeeEnum.params.filterType === 'Department'" v-model="allEmployeeEnum.params.filterData">
            <option value="">
                All Departments
            </option>
            <option v-for="deps, vfkey in departmentEnum.list" :key="vfkey">
                {{ deps.name }}
            </option>
        </select>
        <select v-if="allEmployeeEnum.params.filterType === 'Project'" v-model="allEmployeeEnum.params.filterData">
            <option value="">
                All Projects
            </option>
            <option v-for="proj, vfkey in projectEnum.list" :key="vfkey">
                {{ proj.name }}
            </option>
        </select>

        <table>
            <tr>
                <th>Employee Name</th>
            </tr>
            <tr v-for="employee, vfkey in enums.filteredEmployeesList" :key="vfkey">
                <td>
                    <input v-model="model" type="checkbox" name="employeeSelectorCheckBoxes" :value="employee.id">
                    <label :for="'employeeSelectorCheckBox'+vfkey">{{ employee.fullname_last }}</label>
                </td>
            </tr>
        </table>
    </div>
</template>
