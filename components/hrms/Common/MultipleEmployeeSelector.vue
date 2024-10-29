<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"

const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
onMounted(() => {
    if (!allEmployeeEnum.value.isLoaded) {
        enums.getEmployeeEnum()
    }
})

const model = defineModel({ required: true, type: Array<Number> })
</script>
<template>
    <div class="overflow-y-scroll h-64 max-h-64">
        <div class="flex flex-row gap-1 mb-4">
            <div class="w-1/3 flex items-center">
                <select
                    v-model="allEmployeeEnum.localFilters.multi.filterType"
                    class="p-2 leading-none bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            </div>
            <div class="w-2/3">
                <template v-if="allEmployeeEnum.localFilters.multi.filterType === 'Department'">
                    <HrmsCommonDepartmentSelector
                        v-model="allEmployeeEnum.localFilters.multi.filterData"
                        :show-all="true"
                        class="p-0 leading-none text-xs"
                    />
                </template>
                <template v-if="allEmployeeEnum.localFilters.multi.filterType === 'Project'">
                    <HrmsCommonProjectSelector
                        v-model="allEmployeeEnum.localFilters.multi.filterData"
                        :show-all="true"
                        class="p-0 leading-none text-xs"
                    />
                </template>
            </div>
        </div>
        <input
            v-model="allEmployeeEnum.localFilters.name"
            type="text"
            class="bg-gray-100 mb-4 text-sm rounded-md h-8 w-full border border-gray-200"
            placeholder="Search Employee.."
        >

        <div class="h-64">
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="italic pb-2 pt-2 text-left">
                            Employee Name
                        </th>
                    </tr>
                </thead>
                <tbody class="overflow-y-scroll max-h-64">
                    <tr v-for="employee in enums.filteredEmployeesList" :key="employee">
                        <td class="space-x-2 px-px">
                            <label class="flex space-x-2">
                                <input v-model="model" type="checkbox" name="employeeSelectorCheckBoxes" :value="employee.id" class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10">
                                <span class="cursor-pointer text-sm">{{ employee.fullname_last }}</span>
                            </label>
                            <hr class="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
