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
            Applicant's Spouse Information
        </label>
    </div>
    <table class="w-full border-collapse border border-slate-400 table-fixed items-center">
        <tbody>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_name" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white truncate" alt="Name of Spouse" title="Name of Spouse">Name of Spouse</label>
                        <input id="spouse_name" :value="applicant.name_of_spouse" readonly type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_age" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Age</label>
                        <input id="spouse_age" :value="applicant.age_spouse" readonly type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_date_of_birth" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                        <input id="spouse_date_of_birth" :value="applicant.date_of_birth_spouse" readonly type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_occupation" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Occupation</label>
                        <input id="spouse_occupation" :value="applicant.occupation_spouse" readonly type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_telepone" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Telephone</label>
                        <input id="spouse_telepone" :value="applicant.telephone_spouse" readonly type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <!-- <td class="border border-slate-300 p-1">
                    <div>
                        <label for="spouse_date_of_marriage" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white truncate">Date of Marriage</label>
                        <input id="spouse_date_of_marriage" v-model="applicant.spouse.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td> -->
            </tr>
        </tbody>
    </table>
</template>
