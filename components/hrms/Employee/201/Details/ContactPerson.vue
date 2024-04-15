<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()
const updateContactPerson = () => {
    return true
}
const { information, editable } = storeToRefs(employee)

</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Contact Information
        </label>
        <div class="mt-2">
            <button v-if="editable" class=" bg-green-600 text-white w-8 h-8" @click="updateContactPerson()">
                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
            </button>
        </div>
    </div>
    <table class="w-full border-collapse border border-slate-400 table-fixed">
        <tbody>
            <tr>
                <td class="border border-slate-300 p-1">
                    <label for="contact_person_name" class="block mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white">Name</label>
                    <input id="contact_person_name" v-model="information.contact_person.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_street" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Street</label>
                    <input id="contact_person_street" v-model="information.contact_person.street" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_brgyr" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Barangay</label>
                    <input id="contact_person_brgyr" v-model="information.contact_person.brgy" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_city" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">City</label>
                    <input id="contact_person_city" v-model="information.contact_person.city" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_zip" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Zip</label>
                    <input id="contact_person_zip" v-model="information.contact_person.zip" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_province" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Province</label>
                    <input id="contact_person_province" v-model="information.contact_person.province" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_relationship" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Relationship</label>
                    <input id="contact_person_relationship" v-model="information.contact_person.relationship" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="contact_person_contact_no" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Mobile No.</label>
                    <div class="flex justify-start items-center gap-1">
                        <input id="contact_person_contact_no" v-model="information.contact_person.contact_no" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
