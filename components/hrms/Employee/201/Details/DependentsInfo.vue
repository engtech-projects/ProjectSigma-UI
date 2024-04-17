<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { information } = storeToRefs(employee)
</script>
<template>
    <label for="employee_employment" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Dependents</label>
    <form v-for="(dependent, index) in information.child" :key="index" action="">
        <table class="w-full border-collapse border border-slate-400 table-fixed ">
            <tbody>
                <tr>
                    <td colspan="1" class="border border-slate-300 p-1">
                        <label for="dependent_name" class=" mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white ">Name of Dependents</label>
                        <input id="dependent_name" v-model="dependent.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </td>
                    <td class="border border-slate-300 p-1 space-y-1">
                        <label for="dependent_date_of_birth" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                        <input id="dependent_date_of_birth" v-model="dependent.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="dependent_age" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Age</label>
                        <div class="flex justify-start items-center gap-1">
                            <input id="dependent_age" v-model="dependent.date_of_birth" type="number" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <label for="dependent_relationship" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Relationship</label>
                        <div class="flex justify-start items-center gap-1">
                            <input id="dependent_relationship" v-model="dependent.relationship" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>
