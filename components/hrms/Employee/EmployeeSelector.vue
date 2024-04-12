<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { employeeEnum, projectEnum, departmentEnum } = storeToRefs(enums)
const model = defineModel({ required: true, type: Array<Number> })
</script>
<template>
    <div>
        Filters Here
        <select v-model="employeeEnum.params.filterType">
            <option value="Project">
                Project
            </option>
            <option value="Department">
                Department
            </option>
        </select>
        <select v-model="employeeEnum.params.filterData">
            <option value="">
                All
            </option>
            <option v-for="deps, vfkey in departmentEnum.list" :key="vfkey">
                {{ deps.name }}
            </option>
        </select>
        <select v-model="employeeEnum.params.filterData">
            <option value="">
                All
            </option>
            <option v-for="proj, vfkey in projectEnum.list" :key="vfkey">
                {{ proj.name }}
            </option>
        </select>

        <table>
            <tr>
                <th>Name</th>
            </tr>
            <tr v-for="employee, vfkey in employeeEnum.list" :key="vfkey">
                <td>
                    <input v-model="model" type="checkbox" name="employeeSelectorCheckBoxes" :value="employee.fullname_last">
                </td>
            </tr>
        </table>
        <h1>Hello World</h1>
    </div>
</template>
