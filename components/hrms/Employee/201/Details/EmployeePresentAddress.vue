<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const snackbar = useSnackbar()
const boardLoading = ref(false)

const updateEmployeeAddress = async (id, params) => {
    boardLoading.value = true
    try {
        await employee.updateEmployeeAddress(id, params)
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
const saveEmployeeAddress = async (params) => {
    boardLoading.value = true
    params.type = "present"
    params.employee_id = employee.information.id
    try {
        await employee.saveEmployeeAddress(params)
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
const { editable } = storeToRefs(employee)
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Present Address
        </label>
        <div v-if="editable" class="mt-2">
            <button v-if="employee.presentAddressParams.id" class=" bg-yellow-400 text-white w-8 h-8" @click="updateEmployeeAddress(employee.presentAddressParams.id, employee.presentAddressParams)">
                <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
            </button>
            <button v-else class=" bg-green-600 text-white w-8 h-8" @click="saveEmployeeAddress(employee.presentAddressParams)">
                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
            </button>
        </div>
    </div>
    <table class="w-full border-collapse border border-slate-300 table-fixed">
        <tbody>
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
                        <input id="employee_present_address_street" v-model="employee.presentAddressParams.street" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_brgy" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Barangay</label>
                        <input id="employee_present_address_brgy" v-model="employee.presentAddressParams.brgy" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_city" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">City</label>
                        <input id="employee_present_address_city" v-model="employee.presentAddressParams.city" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_zip" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Zip</label>
                        <input id="employee_present_address_zip" v-model="employee.presentAddressParams.zip" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_province" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Province</label>
                        <input id="employee_present_address_province" v-model="employee.presentAddressParams.province" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
