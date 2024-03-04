<script setup>
import { useEmployeeInfo } from "@/stores/employee"
const employee = useEmployeeInfo()
</script>
<template>
    <form>
        <table class="w-full border-collapse border border-slate-400 table-fixed items-center">
            <label for="employee_employment" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Spouse</label>
            <tbody>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="spouse_name" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white truncate" alt="Name of Spouse" title="Name of Spouse">Name of Spouse</label>
                            <input id="spouse_name" v-model="employee.information.spouse.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="spouse_age" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Age</label>
                            <input id="spouse_age" v-model="employee.information.spouse.age" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="spouse_date_of_birth" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                            <input id="spouse_date_of_birth" v-model="employee.information.spouse.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="spouse_date_of_marriage" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white truncate">Date of Marriage</label>
                            <input id="spouse_date_of_marriage" v-model="employee.information.spouse.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="spouse_occupation" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Occupation</label>
                            <input id="spouse_occupation" v-model="employee.information.spouse.occupation" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</template>
