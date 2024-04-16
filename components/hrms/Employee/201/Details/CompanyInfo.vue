<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const updateEmployeeCompanyInfo = async (id, params) => {
    boardLoading.value = true
    try {
        await employee.updateEmployeeCompanyInfo(id, params)
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
                <button v-if="information.company_employments.id" class=" bg-yellow-400 text-white w-8 h-8" @click="updateEmployeeCompanyInfo(employee.company_employments.id, employee.company_employments)">
                    <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                </button>
                <button v-else class=" bg-green-600 text-white w-8 h-8" @click="saveEmployeeCompanyInfo(employee.company_employments)">
                    <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                </button>
            </div>
        </div>
        <table class="w-full border-collapse border border-slate-400 table-fixed rounded-lg">
            <tbody>
                <tr>
                    <HrmsEmployee201FormDisabledTextInput v-model="information.company_employments.date_hired" title="Date Hired" />
                    <HrmsEmployee201FormDisabledTextInput v-model="information.company_employments.employeedisplay_id" title="ID" />
                    <HrmsEmployee201FormDisabledTextInput v-model="information.company_employments.atm" title="ATM" />
                    <HrmsEmployee201FormDisabledTextInput v-model="information.company_employments.status" title="Status" />
                </tr>
                <tr>
                    <HrmsEmployee201FormTextInput v-model="information.company_employments.phic_number" title="PHIC #" />
                    <HrmsEmployee201FormTextInput v-model="information.company_employments.sss_number" title="SSS #" />
                    <HrmsEmployee201FormTextInput v-model="information.company_employments.tin_number" title="TIN #" />
                    <HrmsEmployee201FormTextInput v-model="information.company_employments.pagibig_number" title="PAGIBIG #" />
                </tr>
            </tbody>
        </table>
    </div>
</template>
