<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const compId = useId()
const enums = useEnumsStore()
const { allEmployeeEnum } = storeToRefs(enums)
onMounted(() => {
    if (!allEmployeeEnum.value.isLoaded) {
        enums.getEmployeeEnum()
    }
})
const model = defineModel({ required: true, type: Array<Number> })
const selection = computed(() => {
    const modelSet = new Set(model.value)
    const childrenSet = new Set(enums.filteredEmployeesList.map(employee => employee.id))
    const intersection = modelSet.intersection(childrenSet)
    if (modelSet.isSupersetOf(childrenSet) && intersection.size > 0) {
        return 1
    }
    if (intersection.isSubsetOf(childrenSet) && intersection.size > 0) {
        return 0
    }
    return -1
})
const selectAll = () => {
    const filteredEmployeeIds = enums.filteredEmployeesList.map(employee => employee.id)
    model.value = [...new Set([...model.value, ...filteredEmployeeIds])]
}
const deselectAll = () => {
    const filteredEmployeeIds = enums.filteredEmployeesList.map(employee => employee.id)
    model.value = model.value.filter(id => !filteredEmployeeIds.includes(id))
}
</script>
<template>
    <div class="p-1 flex flex-col gap-2">
        <div class="flex flex-row gap-2">
            <div class="w-full">
                <label
                    class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Filter
                </label>
                <div class="flex flex-row">
                    <div class="w-1/3">
                        <select
                            v-model="allEmployeeEnum.localFilters.multi.filterType"
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
                        <template v-if="allEmployeeEnum.localFilters.multi.filterType === 'SalaryType'">
                            <select
                                v-model="allEmployeeEnum.localFilters.multi.filterData"
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
            </div>
            <LayoutFormPsTextInput
                v-model="allEmployeeEnum.localFilters.name"
                title="Search Employee"
                class="w-full"
            />
            <LayoutFormPsSelect
                v-model="allEmployeeEnum.localFilters.atm"
                :add-all="true"
                :options-list="['Yes', 'No']"
                title="ATM"
                class="w-full"
            />
        </div>
        <div class="h-80 max-h-80 overflow-auto text-center">
            <table class="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400">
                <thead class="sticky top-0 text-gray-500 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th class="pb-2 pt-2 align-middle">
                            <span id="SELECT_ALL" class="align-middle">
                                <button v-show="selection === -1" class="my-auto" @click.prevent="selectAll()">
                                    <!-- None Selected - Select All -->
                                    <Icon name="ic:baseline-check-box-outline-blank" class="text-xl" />
                                </button>
                                <button v-show="selection === 0" class="my-auto" @click.prevent="selectAll()">
                                    <!-- Partial Selected - Select All -->
                                    <Icon name="ic:baseline-indeterminate-check-box" class="text-xl" />
                                </button>
                                <button v-show="selection === 1" class="my-auto" @click.prevent="deselectAll()">
                                    <!-- All Selected - Deselect All -->
                                    <Icon name="ic:baseline-check-box" class="text-xl" />
                                </button>
                            </span>
                            <span>
                                Company ID
                            </span>
                        </th>
                        <th class="pb-2 pt-2">
                            Employee Name
                        </th>
                        <th class="pb-2 pt-2">
                            Position
                        </th>
                        <th class="pb-2 pt-2">
                            ATM
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee, vfkey in enums.filteredEmployeesList" :key="vfkey" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-100 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <td>
                            <label :for="vfkey + '-checkbox' + compId" class="flex items-center space-x-2">
                                <input
                                    :id="vfkey + '-checkbox' + compId"
                                    v-model="model"
                                    type="checkbox"
                                    name="employeeSelectorCheckBoxes"
                                    :value="employee.id"
                                    class="h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all checked:border-gray-900 checked:bg-gray-900 hover:before:opacity-10"
                                >
                                <span class="cursor-pointer text-sm">{{ employee.company_employments?.employeedisplay_id }}</span>
                            </label>
                        </td>
                        <td>
                            <label :for="vfkey + '-checkbox' + compId" class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.fullname_last }}</span>
                            </label>
                        </td>
                        <td>
                            <label :for="vfkey + '-checkbox' + compId" class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.current_employment?.position?.name }}</span>
                            </label>
                        </td>
                        <td>
                            <label :for="vfkey + '-checkbox' + compId" class="flex items-center space-x-2">
                                <span class="cursor-pointer text-sm">{{ employee.company_employments?.atm && employee.company_employments?.atm.toLowerCase() !== 'n/a' ? 'Yes' : 'No' }}</span>
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
