<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
if (allEmployeeEnum.value.list.length <= 0) {
    enums.getEmployeeEnum()
}
const model = defineModel({ required: true, type: Array<Number> })
</script>
<template>
    <div class="p-1 overflow-y-scroll h-56 max-h-56">
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
            </div>
        </div>

        <div class="text-center pt-2">
            <table class="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                <thead class="text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="pb-2 pt-2">
                            Company ID
                        </th>
                        <th class="pb-2 pt-2">
                            Employee Name
                        </th>
                        <th class="pb-2 pt-2">
                            Employement Type
                        </th>
                        <th class="pb-2 pt-2">
                            Position
                        </th>
                    </tr>
                </thead>
                <tbody class="overflow-y-scroll h-64  max-h-64">
                    <tr v-for="employee, vfkey in enums.filteredEmployeesList" :key="vfkey" class="p-2 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <!-- <pre>{{ employee }}</pre> -->
                        <td class="space-x-2 px-px">
                            <label class="flex items-center space-x-2">
                                <input v-model="model" type="checkbox" name="employeeSelectorCheckBoxes" :value="employee.id" class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10">
                                <span class="cursor-pointer text-sm">{{ employee.company_employments?.employeedisplay_id }}</span>
                            </label>
                        </td>
                        <td class="space-x-2 px-px">
                            <label class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.fullname_last }}</span>
                            </label>
                        </td>
                        <td class="space-x-2 px-px">
                            <label class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.current_employment?.employment_status }}</span>
                            </label>
                        </td>
                        <td class="space-x-2 px-px">
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
