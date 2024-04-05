<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { information: employeeInformation } = storeToRefs(employee)

</script>
<template>
    <div>
        <label for="company_info" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">Company Information</label>
        <form action="">
            <table class="w-full border-collapse border border-slate-400 table-fixed rounded-lg">
                <tbody>
                    <tr>
                        <HrmsEmployee201FormDisabledTextInput v-model="employeeInformation.company_employments.date_hired" title="Date Hired" />
                        <HrmsEmployee201FormDisabledTextInput v-model="employeeInformation.company_employments.employeedisplay_id" title="ID" />
                        <HrmsEmployee201FormDisabledTextInput v-model="employeeInformation.company_employments.atm" title="ATM" />
                        <HrmsEmployee201FormDisabledTextInput v-model="employeeInformation.company_employments.status" title="Status" />
                    </tr>
                    <tr>
                        <HrmsEmployee201FormTextInput v-model="employeeInformation.company_employments.phic_number" title="PHIC #" />
                        <HrmsEmployee201FormTextInput v-model="employeeInformation.company_employments.sss_number" title="SSS #" />
                        <HrmsEmployee201FormTextInput v-model="employeeInformation.company_employments.tin_number" title="TIN #" />
                        <HrmsEmployee201FormTextInput v-model="employeeInformation.company_employments.pagibig_number" title="PAGIBIG #" />
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>
