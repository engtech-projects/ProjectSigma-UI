<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const snackbar = useSnackbar()
const boardLoading = ref(false)

const employee = useEmployeeInfo()
const updateEmployeeInformation = async (id) => {
    boardLoading.value = true
    try {
        await employee.updateEmployeeInformation(id)
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

const { information, editable } = storeToRefs(employee)
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Information
        </label>
        <div class="mt-2">
            <button v-if="editable " class=" bg-green-600 text-white w-8 h-8" @click="updateEmployeeInformation(information.id)">
                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
            </button>
        </div>
    </div>
    <table class="w-full border-collapse border border-slate-300 table-fixed">
        <tbody>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_family_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FAMILY NAME</label>
                        <input id="employee_family_name" v-model="information.family_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_middle_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FIRST NAME</label>
                        <input id="employee_middle_name" v-model="information.first_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_first_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MIDDLE NAME</label>
                        <input id="employee_first_name" v-model="information.middle_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_nick_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NICK NAME</label>
                        <input id="employee_nick_name" v-model="information.nick_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_mobile_number" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CELLPHONE</label>
                        <input id="employee_mobile_number" v-model="information.mobile_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_telephone_number" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">LANDLINE</label>
                        <input id="employee_telephone_number" v-model="information.telephone_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_date_of_birth" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF BIRTH</label>
                        <input id="employee_date_of_birth" v-model="information.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_place_of_birth" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">PLACE OF BIRTH</label>
                        <input id="employee_place_of_birth" v-model="information.place_of_birth" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_citizenship" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CITIZENSHIP</label>
                        <input id="employee_citizenship" v-model="information.citizenship" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="grid grid-cols-2 gap-1 border-slate-300 p-1">
                    <div>
                        <label for="employee_blood_type" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">BLOOD TYPE</label>
                        <select id="employee_blood_type" v-model="information.blood_type" name="bloodtype" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm" :disabled="!editable">
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
                        <select id="employee_gender" v-model="information.gender" name="gender" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm" :disabled="!editable">
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
                        <input id="employee_religion" v-model="information.religion" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="flex-1 space-y-2 border-slate-300 p-1">
                    <div>
                        <label for="employee_civil_status" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CIVIL STATUS</label>
                        <select id="employee_civil_status" v-model="information.civil_status" name="civilstatus" class="block w-full p-0 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm" :disabled="!editable">
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
                        <input id="employee_date_of_marriage" v-model="information.date_of_marriage" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_height" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HEIGHT</label>
                        <input id="employee_height" v-model="information.height" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_weight" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">WEIGHT</label>
                        <input id="employee_weight" v-model="information.weight" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2" class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_father_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FATHER'S NAME</label>
                        <input id="employee_father_name" v-model="employee.information.father.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td colspan="2" class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_mother_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MOTHER'S MAIDEN NAME</label>
                        <input id="employee_mother_name" v-model="employee.information.mother.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
