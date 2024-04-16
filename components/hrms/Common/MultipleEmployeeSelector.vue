<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
const model = defineModel({ required: true, type: Array<Number> })
</script>
<template>
    <div>
        <select
            v-model="allEmployeeEnum.params.filterType"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option value="" selected>
                Select Filter Type
            </option>
            <option value="Project">
                Project
            </option>
            <option value="Department">
                Department
            </option>
        </select>

        <template v-if="allEmployeeEnum.params.filterType === 'Department'">
            <HrmsCommonDepartmentSelector
                v-model="allEmployeeEnum.params.filterData"
            />
        </template>
        <template v-if="allEmployeeEnum.params.filterType === 'Project'">
            <HrmsCommonProjectSelector
                v-model="allEmployeeEnum.params.filterData"
            />
        </template>

        <table>
            <tr>
                <th class="italic pb-2 pt-2">
                    Employee Name
                </th>
            </tr>
            <tr v-for="employee, vfkey in enums.filteredEmployeesList" :key="vfkey">
                <td class="space-x-2 px-px">
                    <label class="flex items-center space-x-2">
                        <input v-model="model" type="checkbox" name="employeeSelectorCheckBoxes" :value="employee.id" class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10">
                        <span class="cursor-pointer text-sm">{{ employee.fullname_last }}</span>
                    </label>
                    <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700">
                </td>
            </tr>
        </table>
    </div>
</template>
