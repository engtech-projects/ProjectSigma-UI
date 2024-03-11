<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
const employee = useEmployeeInfo()

const { information: employeeInformation } = storeToRefs(employee)

const emprecords = ref(null)
emprecords.value = employee.employee_seminartraining
const addEmprecords = () => {
    emprecords.value.push(
        {
            id: "",
            employee_id: "",
            name_title_training: "",
            inclusive_dates: "",
            venue: "",
            training_provider: "",
        }
    )
}
const deleteEmprecords = (index) => {
    this.emprecords.splice(index, 1)
}
</script>
<template>
    <div>
        <label for="employee_employment" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">
            Trainings and Seminars Attended
        </label>
        <form v-for="(trainingSeminar, index) in employeeInformation.employee_seminartraining" :key="index" action="">
            <div class="flex items-center justify-end">
                <table class="w-full border-collapse border border-slate-400 table-fixed ">
                    <tbody>
                        <tr>
                            <td colspan="1" class="border border-slate-300 p-1">
                                <label for="trainingSeminar_name_title_training" class=" mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white ">Name of Dependents</label>
                                <input id="trainingSeminar_name_title_training" v-model="trainingSeminar.name_title_training" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </td>
                            <td class="border border-slate-300 p-1 space-y-1">
                                <label for="trainingSeminar_inclusive_dates" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Date of Birth</label>
                                <input id="trainingSeminar_inclusive_dates" v-model="trainingSeminar.inclusive_dates" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </td>
                            <td class="border border-slate-300 p-1">
                                <label for="trainingSeminar_venue" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Age</label>
                                <div class="flex justify-start items-center gap-1">
                                    <input id="trainingSeminar_venue" v-model="trainingSeminar.venue" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </td>
                            <td class="border border-slate-300 p-1">
                                <label for="trainingSeminar_training_provider" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Relationship</label>
                                <div class="flex justify-start items-center gap-1">
                                    <input id="trainingSeminar_training_provider" v-model="trainingSeminar.training_provider" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button v-if="index > 0" class="delete-button" @click.prevent="deleteEmprecords(index)">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-red-600"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button v-if="index === emprecords.length - 1" class="add-button" @click="addEmprecords">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 text-green-600 "
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                <button v-if="index === emprecords.length - 1" class="add-button" @click="addEmprecords">
                    <span class="text-green-500 hover:text-green-700">Add Trainings & Seminars Record</span>
                </button>
            </div>
            <table class="w-full border-collapse border border-slate-400 table-fixed">
                <tbody>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input v-model="emprecord.incdates" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME & LOCATION OF TRAINING PROVIDER</label>
                            <div class="justify-center items-center gap-2">
                                <input id="superior_name" v-model="emprecord.posdept" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">INCLUSIVE DATES</label>
                            <div class="flex-wrap">
                                <input id="inclusive_date" v-model="emprecord.supcont" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>
