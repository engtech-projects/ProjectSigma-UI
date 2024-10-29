<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const snackbar = useSnackbar()
const boardLoading = ref(false)

const updateContactPerson = async (id, params) => {
    boardLoading.value = true
    try {
        await employee.updateRelatedPerson(params, id)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
        boardLoading.value = false
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
        boardLoading.value = false
    }
}
const saveContactPerson = async (params) => {
    boardLoading.value = true
    try {
        await employee.saveRelatedPerson(params)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
        boardLoading.value = false
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
        boardLoading.value = false
    }
}
const addParams = () => {
    information.value.contact_person = {
        id: null,
        name: null,
        street: null,
        brgy: null,
        city: null,
        zip: null,
        employee_id: information.value.id,
        type: "contact person",
        province: null,
        relationship: null,
        contact_no: null,
        date_of_birth: null
    }
}
const { information, editable } = storeToRefs(employee)
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Contact Person Information
        </label>
        <div class="mt-2">
            <button v-if="editable && !information.contact_person.id" class=" bg-green-600 text-white w-8 h-8" @click="saveContactPerson(information.contact_person)">
                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
            </button>
            <button v-if="editable && information.contact_person.id" class=" bg-yellow-400 text-white w-8 h-8" @click="updateContactPerson(information.contact_person.id, information.contact_person)">
                <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
            </button>
        </div>
    </div>
    <table class="w-full border-collapse border border-slate-400 table-fixed items-center">
        <tbody v-if="information.contact_person">
            <tr>
                <td class="border border-slate-300 p-1">
                    <label for="contact_person_name" class="block mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white">Name</label>
                    <input
                        id="contact_person_name"
                        v-model="information.contact_person.name"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_zip" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                    <input
                        id="contact_person_zip"
                        v-model="information.contact_person.date_of_birth"
                        :disabled="!editable"
                        type="date"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_relationship" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Occupation</label>
                    <input
                        id="contact_person_relationship"
                        v-model="information.contact_person.occupation"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="contact_person_contact_no" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Mobile No.</label>
                    <div class="flex justify-start items-center gap-1">
                        <input
                            id="contact_person_contact_no"
                            v-model="information.contact_person.contact_no"
                            :disabled="!editable"
                            type="text"
                            class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_relationship" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Relationship</label>
                    <input
                        id="contact_person_relationship"
                        v-model="information.contact_person.relationship"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_street" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Street</label>
                    <input
                        id="contact_person_street"
                        v-model="information.contact_person.street"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_brgyr" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Barangay</label>
                    <input
                        id="contact_person_brgyr"
                        v-model="information.contact_person.brgy"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_city" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">City</label>
                    <input
                        id="contact_person_city"
                        v-model="information.contact_person.city"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_zip" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Zip</label>
                    <input
                        id="contact_person_zip"
                        v-model="information.contact_person.zip"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_province" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Province</label>
                    <input
                        id="contact_person_province"
                        v-model="information.contact_person.province"
                        :disabled="!editable"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <button
                class=" bg-green-600 text-white w-8 h-8"
                @click="addParams()"
            >
                <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
            </button>
        </tbody>
    </table>
</template>
