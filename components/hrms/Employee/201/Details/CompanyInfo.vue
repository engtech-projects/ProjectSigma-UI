<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const snackbar = useSnackbar()
const boardLoading = ref(false)

const updateEmployeeCompanyInfo = async (id, params) => {
    boardLoading.value = true
    try {
        await employee.updateEmployeeCompanyInfo(params, id)
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
const saveEmployeeCompanyInfo = async (params) => {
    boardLoading.value = true
    params.type = "permanent"
    params.employee_id = employee.information.id
    try {
        await employee.saveEmployeeCompanyInfo(params)
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
    <div>
        <div class="flex justify-start mt-3 gap-3">
            <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
                Employee Company Information
            </label>
            <div v-if="editable" class="mt-2">
                <button v-if="information.company_employments.id" class=" bg-yellow-400 text-white w-8 h-8" @click="updateEmployeeCompanyInfo(information.company_employments.id, information.company_employments)">
                    <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                </button>
                <button v-else class=" bg-green-600 text-white w-8 h-8" @click="saveEmployeeCompanyInfo(information.company_employments)">
                    <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                </button>
            </div>
        </div>
        <table class="w-full border-collapse border border-slate-400 table-fixed rounded-lg">
            <tbody>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="date_hired" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">DATE HIRED</label>
                            <input id="date_hired" v-model="information.company_employments.date_hired" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="employeedisplay_id" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">ID</label>
                            <input id="employeedisplay_id" v-model="information.company_employments.employeedisplay_id" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="atm" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">ATM</label>
                            <input id="atm" v-model="information.company_employments.atm" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="status" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Status</label>
                            <input id="status" v-model="information.company_employments.status" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="phic_number" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">PHIC #</label>
                            <input id="phic_number" v-model="information.company_employments.phic_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="sss_number" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">SSS #</label>
                            <input id="sss_number" v-model="information.company_employments.sss_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="tin_number" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">TIN #</label>
                            <input id="tin_number" v-model="information.company_employments.tin_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="pagibig_number" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">PAGIBIG #</label>
                            <input id="pagibig_number" v-model="information.company_employments.pagibig_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
