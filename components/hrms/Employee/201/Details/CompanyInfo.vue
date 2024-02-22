<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/employee"

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
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="company_date_hired" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date Hired</label>
                                <input id="company_date_hired" :value="employeeInformation.company_employments?.date_hired" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Position</label>
                                <input id="master_title" :value="employeeInformation.company_employments?.position" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Department</label>
                                <input id="master_title" :value="employeeInformation.company_employments?.department" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Immediate Supervisor</label>
                                <input id="master_title" :value="employeeInformation.company_employments?.imidiate_supervisor" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">PHIC #</label>
                                <input id="master_title" :value="employeeInformation.company_employments?.phic_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">SSS #</label>
                                <input id="master_title" :value="employeeInformation.company_employments?.sss_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">TIN #</label>
                                <input id="master_title" :value="employeeInformation.company_employments?.tin_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <div>
                                <label for="small-input" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">PAGIBIG #</label>
                                <input id="master_title" :value="employeeInformation.company_employments?.pagibig_number" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>
