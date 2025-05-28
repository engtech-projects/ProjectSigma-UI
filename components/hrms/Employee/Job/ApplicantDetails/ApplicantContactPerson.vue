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
            Applicant Contact Person Information
        </label>
    </div>
    <table class="w-full border-collapse border border-slate-400 table-fixed items-center">
        <tbody>
            <tr>
                <td class="border border-slate-300 p-1">
                    <label for="contact_person_name" class="block mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white">Name</label>
                    <input
                        id="contact_person_name"
                        :value="applicant.icoe_name"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="contact_person_occupation" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Occupation</label>
                    <input
                        id="contact_person_occupation"
                        :value="applicant.icoe_occupation"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="contact_person_contact_no" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Mobile No.</label>
                    <div class="flex justify-start items-center gap-1">
                        <input
                            id="contact_person_contact_no"
                            :value="applicant.telephone_icoe"
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
                        :value="applicant.icoe_relationship"
                        type="text"
                        class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                </td>
            </tr>
        </tbody>
    </table>
</template>
