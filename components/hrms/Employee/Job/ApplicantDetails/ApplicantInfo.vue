<script setup>
const config = useRuntimeConfig()
defineProps({
    applicant: {
        type: Object,
        required: true,
    },
})
</script>
<template>
    <div class="grid grid-cols-4 gap-8 p-4">
        <div>
            <p class="font-semibold italic">
                Application Letter Attachment:
            </p>
            <p class="truncate hover:cursor-pointer hover:text-blue-500 italic">
                <a target="_blank" :href="config.public.HRMS_API_URL + '/storage/' + applicant?.application_letter_attachment">
                    <Icon
                        name="mage:file-download-fill"
                        class="h-5 w-5 lg:h-5 lg:w-5"
                    />
                    Download Application Letter
                </a>
            </p>
        </div>
        <div>
            <p class="font-semibold italic">
                Resume:
            </p>
            <p class="truncate hover:cursor-pointer hover:text-blue-500 italic">
                <a target="_blank" :href="config.public.HRMS_API_URL + '/storage/' + applicant?.resume_attachment">
                    <Icon name="mage:file-download-fill" class="h-5 w-5 lg:h-5 lg:w-5" />
                    Download Resume
                </a>
            </p>
        </div>
        <div>
            <p class="font-semibold italic">
                Desired Position:
            </p>
            <p>{{ applicant.desired_position }}</p>
        </div>
        <div>
            <p class="font-semibold italic">
                Date of Application:
            </p>
            <p>{{ applicant.date_of_application }}</p>
        </div>
    </div>
    <hr>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Applicant Information
        </label>
    </div>
    <table class="w-full border-collapse border border-slate-300 table-fixed">
        <tbody>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_family_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">LAST NAME</label>
                        <input id="applicant_family_name" :value="applicant.lastname" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_middle_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FIRST NAME</label>
                        <input id="applicant_middle_name" :value="applicant.firstname" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_first_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MIDDLE NAME</label>
                        <input id="applicant_first_name" :value="applicant.middlename" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_nick_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">SUFFIX</label>
                        <input id="applicant_nick_name" :value="applicant.name_suffix" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_nick_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NICK NAME</label>
                        <input id="applicant_nick_name" :value="applicant.nickname" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_mobile_number" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CELLPHONE</label>
                        <input id="applicant_mobile_number" :value="applicant.contact_info" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_date_of_birth" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF BIRTH</label>
                        <input id="applicant_date_of_birth" :value="applicant.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_place_of_birth" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">PLACE OF BIRTH</label>
                        <input id="applicant_place_of_birth" :value="applicant.place_of_birth" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_citizenship" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CITIZENSHIP</label>
                        <input id="applicant_citizenship" :value="applicant.citizenship" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="flex-1 space-y-2 border-slate-300 p-1">
                    <div>
                        <label for="applicant_blood_type" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">BLOOD TYPE</label>
                        <input id="applicant_blood_type" :value="applicant.blood_type" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                    <div>
                        <label for="applicant_gender" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">GENDER</label>
                        <input id="applicant_gender" :value="applicant.gender" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_religion" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">RELIGION</label>
                        <input id="applicant_religion" :value="applicant.religion" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="flex-1 space-y-2 border-slate-300 p-1">
                    <div>
                        <label for="applicant_civil_status" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">CIVIL STATUS</label>
                        <input id="applicant_civil_status" :value="applicant.civil_status" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_date_of_marriage" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF MARRIAGE</label>
                        <input id="applicant_date_of_marriage" :value="applicant.date_of_marriage" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_height" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">HEIGHT</label>
                        <input id="applicant_height" :value="applicant.height" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_weight" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">WEIGHT</label>
                        <input id="applicant_weight" :value="applicant.weight" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
            </tr>
            <tr>
                <td colspan="2" class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_father_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">FATHER'S NAME</label>
                        <input id="applicant_father_name" :value="applicant.father_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
                <td colspan="2" class="border border-slate-300 p-1">
                    <div>
                        <label for="applicant_mother_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">MOTHER'S MAIDEN NAME</label>
                        <input id="applicant_mother_name" :value="applicant.mother_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
