<script setup>
const props = defineProps({
    applicant: {
        type: Object,
        required: true,
    },
})
const secondaryEducation = computed(() => {
    if (!props.applicant?.education) { return null }
    return props.applicant.education.find(edu => edu.type === "secondary") || null
})
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Secondary Education
        </label>
    </div>
    <LayoutBoards title="" class="w-full">
        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tbody>
                <tr v-if="secondaryEducation">
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_name" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            NAME OF SCHOOL
                        </p>
                        <div class="flex">
                            <input
                                id="elementary_name"
                                v-model="secondaryEducation.name"
                                type="text"
                                class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_degree_earned_of_school" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            DEGREE EARNED
                        </p>
                        <div class="flex">
                            <input
                                id="elementary_degree_earned_of_school"
                                v-model="secondaryEducation.degree_earned_of_school"
                                type="text"
                                class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                        </div>
                    </td>
                    <td class="border border-slate-300">
                        <div class="p-1">
                            <p for="elementary_period_attendance_from" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                                INCLUSIVE DATES
                            </p>
                            <div class="flex justify-center">
                                <input
                                    id="elementary_period_attendance_from"
                                    v-model="secondaryEducation.period_attendance_from"
                                    type="text"
                                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                -
                                <input
                                    id="elementary_period_attendance_to"
                                    v-model="secondaryEducation.period_attendance_to"
                                    type="text"
                                    class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                            </div>
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="elementary_honors_received" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            HONORS RECEIVED
                        </p>
                        <div class="flex">
                            <input
                                id="elementary_honors_received"
                                v-model="secondaryEducation.honors_received"
                                type="text"
                                class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <p for="secondary_year_graduated" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">
                            YEAR GRADUATED
                        </p>
                        <div class="flex">
                            <input
                                id="secondary_year_graduated"
                                v-model="secondaryEducation.year_graduated"
                                type="text"
                                class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </LayoutBoards>
</template>
