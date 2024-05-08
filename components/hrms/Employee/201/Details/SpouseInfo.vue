<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const saveEmployeeInformation = () => {
    return true
}
const { information, editable } = storeToRefs(employee)
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Spouse Information
        </label>
        <div class="mt-2">
            <button v-if="editable " class=" bg-green-600 text-white w-8 h-8" @click="saveEmployeeInformation()">
                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
            </button>
        </div>
    </div>
    <table class="w-full border-collapse border border-slate-400 table-fixed items-center">
        <tbody v-if="information.spouse">
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_name" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white truncate" alt="Name of Spouse" title="Name of Spouse">Name of Spouse</label>
                        <input id="spouse_name" v-model="information.spouse.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_age" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Age</label>
                        <input id="spouse_age" v-model="information.spouse.age" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_date_of_birth" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                        <input id="spouse_date_of_birth" v-model="information.spouse.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_occupation" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Occupation</label>
                        <input id="spouse_occupation" v-model="information.spouse.occupation" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <!-- <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_date_of_marriage" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white truncate">Date of Marriage</label>
                        <input id="spouse_date_of_marriage" v-model="information.spouse.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td> -->
            </tr>
        </tbody>
        <tbody v-else>
            <div v-if="!editable">
                <p class="p-2 text-lg text-center">
                    No Employee Spouse Information
                </p>
            </div>
            <div v-else>
                <button
                    class=" bg-green-600 text-white w-8 h-8"
                    @click="addParams()"
                >
                    <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
                </button>
            </div>
        </tbody>
    </table>
</template>
