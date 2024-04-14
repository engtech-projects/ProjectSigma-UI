<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { information, editable } = storeToRefs(employee)

const addRelative = () => {
    information.value.child.push({
        id: null,
        name: "",
        employee_id: information.value.id,
        zip: null,
        brgy: null,
        city: null,
        contact_no: null,
        date_of_birth: null,
        occupation: null,
        province: null,
        age: null,
        relationship: null,
        street: null,
        type: null,
        updated_at: null,
        created_at: null,
        deleted_at: null,
    })
}
const deleteRelative = (index) => {
    information.value.child.splice(index, 1)
}
addRelative()
</script>
<template>
    <tr v-for="(relative, index) in relatives" :key="index">
        <td class="border border-slate-300 p-1">
            <p class="inline mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">
                DO YOU HAVE RELATIVES OR FAMILY MEMBERS WORKING FOR EVENPAR?
            </p>
        </td>

        <td class="border border-slate-300 p-1">
            <p class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                NAME
            </p>
            <div class="flex">
                <input v-model="relative.relative_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
            </div>
        </td>
        <td class="border border-slate-300 p-1">
            <p class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                RELATIONSHIP
            </p>
            <div class="flex">
                <input v-model="relative.relative_rel" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
            </div>
        </td>
        <td class="border border-slate-300 p-1">
            <p class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                POSITION & DEPARTMENT
            </p>
            <div class="flex">
                <input v-model="relative.relative_position" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                <button v-if="index > 0" class="delete-button" @click.prevent="deleteRelative(index)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-red-600"
                    ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
                <button v-if="index === relatives.length - 1" class="add-button " @click="addRelative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-green-600 "
                    ><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </button>
            </div>
        </td>
    </tr>
</template>
