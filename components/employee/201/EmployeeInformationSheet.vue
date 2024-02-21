<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/employee"

const employee = useEmployeeInfo()
const { information: employeeInformation } = storeToRefs(employee)

</script>
<template>
    <div class="w-full py-4 px-2 bg-slate-100 rounded-sm border-t-4 border-teal-500">
        <div class="w-full">
            <div class="mb-4">
                <SearchBar />
            </div>
        </div>
        <div class="w-full">
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">EMPLOYEE ID</label>
                <input id="small-input" v-model="employeeInformation.family_name" :disabled="true" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FIRST NAME</label>
                <input id="small-input" v-model="employeeInformation.first_name" :disabled="true" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MIDDLE NAME</label>
                <input id="small-input" v-model="employeeInformation.middle_name" :disabled="true" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">LAST NAME</label>
                <input id="small-input" v-model="employeeInformation.family_name" :disabled="true" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NICK NAME</label>
                <input id="small-input" v-model="employeeInformation.nick_name" :disabled="true" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">BIRTHDAY</label>
                <input id="small-input" v-model="employeeInformation.birthday" :disabled="true" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">GENDER</label>
                <input id="small-input" v-model="employeeInformation.gender" :disabled="true" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
            <div class="w-full p-2">
                <label for="small-input" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MOBILE NUMBER</label>
                <input id="small-input" v-model="employeeInformation.mobile_number" :disabled="true" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            </div>
        </div>
    </div>
</template>
