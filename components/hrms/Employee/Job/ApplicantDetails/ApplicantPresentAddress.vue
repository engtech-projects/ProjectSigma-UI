<script setup>
defineProps({
    applicant: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Applicant Present Address
        </label>
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
                        <input id="employee_present_address_street" :value=" applicant.pre_address_street || ''" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_brgy" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Barangay</label>
                        <input id="employee_present_address_brgy" :value=" applicant.pre_address_brgy || ''" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_city" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">City</label>
                        <input id="employee_present_address_city" :value=" applicant.pre_address_city || ''" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_zip" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Zip</label>
                        <input id="employee_present_address_zip" :value=" applicant.pre_address_zip || ''" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="employee_present_address_province" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Province</label>
                        <input id="employee_present_address_province" :value=" applicant.pre_address_province || ''" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
