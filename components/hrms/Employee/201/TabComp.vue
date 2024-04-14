<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()
const { editable } = storeToRefs(employee)

const setEdit = () => {
    editable.value = !editable.value
}
</script>
<template>
    <div class="flex md:flex-row flex-col">
        <div class="w-full md:w-1/3">
            <HrmsEmployee201SearchProfile />
        </div>
        <div class="w-full md:w-2/3">
            <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul id="default-tab" class="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#default-tab-content" role="tablist">
                    <li class="mr-2" role="presentation">
                        <button
                            id="pis-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg"
                            data-tabs-target="#pis"
                            type="button"
                            role="tab"
                            aria-controls="pis"
                            aria-selected="false"
                        >
                            PIS
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button
                            id="staff-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            data-tabs-target="#staff"
                            type="button"
                            role="tab"
                            aria-controls="staff"
                            aria-selected="false"
                        >
                            Staff Information Sheet
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button
                            id="docsmemo-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            data-tabs-target="#docsmemo"
                            type="button"
                            role="tab"
                            aria-controls="docsmemo"
                            aria-selected="false"
                        >
                            Documents & Memos
                        </button>
                    </li>
                    <li class="mr-2" role="presentation">
                        <button
                            id="docsmemo-tab"
                            class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            data-tabs-target="#employeeId"
                            type="button"
                            role="tab"
                            aria-controls="employeeId"
                            aria-selected="false"
                        >
                            Employee Identification Card
                        </button>
                    </li>
                </ul>
            </div>
            <div v-show="employee.information.id" class="w-full p-2">
                <label class="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        class="sr-only peer"
                        :checked="editable"
                        @change="setEdit()"
                    >
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Edit Employee</span>
                </label>
            </div>
            <div id="default-tab-content">
                <div id="pis" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
                    <HrmsEmployee201PersonnelInfoSheet />
                </div>
                <div id="staff" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="staff-tab">
                    <HrmsEmployee201StaffInfoSheet />
                </div>

                <div id="docsmemo" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="docsmemo-tab">
                    <HrmsEmployee201DocumentsMemo />
                </div>
                <div id="employeeId" class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" role="tabpanel" aria-labelledby="docsmemo-tab">
                    <HrmsEmployee201IdentificationCard />
                </div>
            </div>
        </div>
    </div>
</template>
