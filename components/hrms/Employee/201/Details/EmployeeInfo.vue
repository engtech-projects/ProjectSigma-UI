<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const isDisabled = ref(true)
const employee = useEmployeeInfo()
const { information: employeeInformation } = storeToRefs(employee)

const children = ref([{ name: "", dob: "" }])
const relatives = ref([{ relative_name: "", relative_rel: "", relative_position: "", reason: "" }])
const addChild = () => {
    children.value.push({ name: "", dob: "" })
}
const addRelative = () => {
    relatives.value.push({ relative_name: "", relative_rel: "", relative_position: "", reason: "" })
}

const deleteChild = () => {
    children.value.splice(index, 1)
}

const deleteRelative = () => {
    relatives.value.splice(index, 1)
}
</script>
<template>
    <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">Employee Information</label>
    <form action="">
        <table class="w-full border-collapse border border-slate-300 table-fixed">
            <tbody>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_family_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FAMILY NAME</label>
                            <input id="employee_family_name" v-model="employeeInformation.family_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_middle_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FIRST NAME</label>
                            <input id="employee_middle_name" v-model="employeeInformation.middle_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_first_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MIDDLE NAME</label>
                            <input id="employee_first_name" v-model="employeeInformation.first_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_nick_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NICK NAME</label>
                            <input id="employee_nick_name" v-model="employeeInformation.nick_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" class="border border-slate-300 p-1">
                        <div>
                            <p class="block mb-2 text-[11px] text-2xl text-gray-900 dark:text-white">
                                PRESENT ADDRESS
                            </p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_present_address_street" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Street</label>
                            <input id="employee_present_address_street" v-model="employee.presentAddressData.street" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_present_address_brgy" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Barangay</label>
                            <input id="employee_present_address_brgy" v-model="employee.presentAddressData.brgy" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_present_address_city" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">City</label>
                            <input id="employee_present_address_city" v-model="employee.presentAddressData.city" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_present_address_zip" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Zip</label>
                            <input id="employee_present_address_zip" v-model="employee.presentAddressData.zip" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_present_address_province" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Province</label>
                            <input id="employee_present_address_province" v-model="employee.presentAddressData.province" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" class="border border-slate-300 p-1">
                        <div>
                            <p class="block mb-2 text-[11px] text-2xl text-gray-900 dark:text-white">
                                PERMANENT ADDRESS
                            </p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_permanent_address_street" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Street</label>
                            <input id="employee_permanent_address_street" v-model="employee.permanentAddressData.street" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_permanent_address_brgy" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Barangay</label>
                            <input id="employee_permanent_address_brgy" v-model="employee.permanentAddressData.brgy" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_permanent_address_city" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">City</label>
                            <input id="employee_permanent_address_city" v-model="employee.permanentAddressData.city" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_permanent_address_zip" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Zip</label>
                            <input id="employee_permanent_address_zip" v-model="employee.permanentAddressData.zip" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_permanent_address_province" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Province</label>
                            <input id="employee_permanent_address_province" v-model="employee.permanentAddressData.province" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_mobile_number" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CELLPHONE</label>
                            <input id="employee_mobile_number" v-model="employeeInformation.mobile_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_telephone_number" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">LANDLINE</label>
                            <input id="employee_telephone_number" v-model="employeeInformation.telephone_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_date_of_birth" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF BIRTH</label>
                            <input id="employee_date_of_birth" v-model="employeeInformation.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_place_of_birth" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">PLACE OF BIRTH</label>
                            <input id="employee_place_of_birth" v-model="employeeInformation.place_of_birth" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_citizenship" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CITIZENSHIP</label>
                            <input id="employee_citizenship" v-model="employeeInformation.citizenship" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="grid grid-cols-2 gap-1 border-slate-300 p-1">
                        <div>
                            <label for="employee_blood_type" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">BLOOD TYPE</label>
                            <select id="employee_blood_type" v-model="employeeInformation.blood_type" name="bloodtype" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm" :disabled="isDisabled">
                                <option value="A+">
                                    A+
                                </option>
                                <option value="A-">
                                    A-
                                </option>
                                <option value="B+">
                                    B+
                                </option>
                                <option value="B-">
                                    B-
                                </option>
                                <option value="O+">
                                    O+
                                </option>
                                <option value="O">
                                    O
                                </option>
                                <option value="O-">
                                    O-
                                </option>
                                <option value="AB+">
                                    AB+
                                </option>
                                <option value="AB-">
                                    AB-
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="employee_gender" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">GENDER</label>
                            <select id="employee_gender" v-model="employeeInformation.gender" name="gender" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm" :disabled="isDisabled">
                                <option value="MALE">
                                    Male
                                </option>
                                <option value="FEMALE">
                                    Female
                                </option>
                                <option value="OTHER">
                                    Other
                                </option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_religion" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">RELIGION</label>
                            <input id="employee_religion" v-model="employeeInformation.religion" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="flex-1 space-y-2 border-slate-300 p-1">
                        <div>
                            <label for="employee_civil_status" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CIVIL STATUS</label>
                            <select id="employee_civil_status" v-model="employeeInformation.civil_status" name="civilstatus" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm" :disabled="isDisabled">
                                <option value="SINGLE">
                                    SINGLE
                                </option>
                                <option value="MARRIED">
                                    MARRIED
                                </option>
                                <option value="WIDOW">
                                    WIDOW
                                </option>
                                <option value="COMPLICATED">
                                    COMPLICATED
                                </option>
                            </select>
                        </div>
                        <div>
                            <label for="employee_date_of_marriage" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF MARRIAGE</label>
                            <input id="employee_date_of_marriage" v-model="employeeInformation.date_of_marriage" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_height" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HEIGHT</label>
                            <input id="employee_height" v-model="employeeInformation.height" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_weight" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">WEIGHT</label>
                            <input id="employee_weight" v-model="employeeInformation.weight" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_father_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FATHER'S NAME</label>
                            <input id="employee_father_name" v-model="employee.information.father.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="employee_mother_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MOTHER'S MAIDEN NAME</label>
                            <input id="employee_mother_name" v-model="employee.information.mother.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                </tr>

                <tr v-for="(child, index) in employee.information.child" :key="index">
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF CHILDREN</label>
                            <input v-model="child.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF BIRTH</label>
                        <div class="flex">
                            <input v-model="child.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                            <button v-if="index > 0" class="delete-button" @click.prevent="deleteChild(index)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6 text-red-600"
                                ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                            <button v-if="index === children.length - 1" class="add-button " @click="addChild">
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
                            <input v-model="relative.relative_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            RELATIONSHIP
                        </p>
                        <div class="flex">
                            <input v-model="relative.relative_rel" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            POSITION & DEPARTMENT
                        </p>
                        <div class="flex">
                            <input v-model="relative.relative_position" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="isDisabled">
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
            </tbody>
        </table>
    </form>
</template>
