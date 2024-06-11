<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
if (allEmployeeEnum.value.list.length <= 0) {
    enums.getEmployeeEnum()
}

const model = defineModel({ required: true, type: Array<Number> })

const selectAll = ref(false)
const selectAllEmployees = () => {
    model.value = selectAll.value ? enums.filteredEmployeesList.map(employee => employee.id) : []
}
</script>
<template>
    <div class="p-1 flex flex-col gap-2">
        <div class="flex flex-row gap-2">
            <div class="w-1/3">
                <select
                    v-model="allEmployeeEnum.params.filterType"
                    class="leading-none bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    <option value="SalaryType">
                        Salary Type
                    </option>
                </select>
            </div>
            <div class="w-2/3">
                <template v-if="allEmployeeEnum.params.filterType === 'Department'">
                    <HrmsCommonDepartmentSelector
                        v-model="allEmployeeEnum.params.filterData"
                        :show-all="true"
                        class="p-0 leading-none text-xs"
                    />
                </template>
                <template v-if="allEmployeeEnum.params.filterType === 'Project'">
                    <HrmsCommonProjectSelector
                        v-model="allEmployeeEnum.params.filterData"
                        :show-all="true"
                        class="p-0 leading-none text-xs"
                    />
                </template>
                <template v-if="allEmployeeEnum.params.filterType === 'SalaryType'">
                    <select
                        v-model="allEmployeeEnum.params.filterData"
                        class="leading-none bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">
                            All
                        </option>
                        <option value="Weekly">
                            Weekly
                        </option>
                        <option value="Monthly">
                            Monthly
                        </option>
                    </select>
                </template>
            </div>
        </div>
        <div>
            <label class="items-center space-x-2">
                <input v-model="selectAll" type="checkbox" class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10" @change="selectAllEmployees">
                <span class="cursor-pointer text-sm">Select All</span>
            </label>
        </div>
        <div class="h-80 max-h-80 overflow-auto text-center">
            <table class="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                <thead class="sticky top-0 text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="pb-2 pt-2">
                            Company ID
                        </th>
                        <th class="pb-2 pt-2">
                            Employee Name
                        </th>
                        <th class="pb-2 pt-2">
                            Employment Type
                        </th>
                        <th class="pb-2 pt-2">
                            Position
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee, vfkey in enums.filteredEmployeesList" :key="vfkey" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td>
                            <label class="flex items-center space-x-2">
                                <input v-model="model" type="checkbox" name="employeeSelectorCheckBoxes" :value="employee.id" class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10">
                                <span class="cursor-pointer text-sm">{{ employee.company_employments?.employeedisplay_id }}</span>
                            </label>
                        </td>
                        <td>
                            <label class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.fullname_last }}</span>
                            </label>
                        </td>
                        <td>
                            <label class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.current_employment?.employment_status }}</span>
                            </label>
                        </td>
                        <td>
                            <label class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.current_employment?.position?.name }}</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
