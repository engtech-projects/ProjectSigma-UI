<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { information, editable } = storeToRefs(employee)
const snackbar = useSnackbar()

const addSeminarAndTraining = () => {
    information.value.employee_seminartraining.push({
        id: null,
        employee_id: information.value.id,
        name_title_training: "",
        inclusive_dates: "",
        venue: "",
        training_provider: "",
    })
}

const deleteSeminarTraining = (index) => {
    information.value.employee_seminartraining.splice(index, 1)
}
const saveUpdateSeminarTraining = async (params) => {
    try {
        await employee.saveUpdateSeminarTraining(params)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
const updateSeminarTrainingData = async (params, id) => {
    try {
        await employee.updateSeminarTraining(params, id)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
const deleteSeminarTrainingData = async (id) => {
    try {
        await employee.deleteSeminarTraining(id)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Trainings And Seminar Information
        </label>
    </div>
    <table v-if="information.employee_seminartraining.length > 0" class="w-full border-collapse border border-slate-300 table-fixed">
        <tbody>
            <tr v-for="(trainingSeminar, index) in information.employee_seminartraining" :key="index">
                <td colspan="1" class="border border-slate-300 p-1">
                    <label for="trainingSeminar_name_title_training" class=" mb-2 text-xs w-32 font-bold text-gray-900 dark:text-white ">Title Training</label>
                    <input id="trainingSeminar_name_title_training" v-model="trainingSeminar.name_title_training" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <label for="trainingSeminar_inclusive_dates" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Inclusive Date</label>
                    <input id="trainingSeminar_inclusive_dates" v-model="trainingSeminar.inclusive_dates" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="trainingSeminar_venue" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Venue</label>
                    <div class="flex justify-start items-center gap-1">
                        <input id="trainingSeminar_venue" v-model="trainingSeminar.venue" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <label for="trainingSeminar_training_provider" class="block mb-2 text-[11px] font-bold text-gray-900 dark:text-white">Training Provider</label>
                    <div class="flex justify-start items-center gap-1">
                        <input id="trainingSeminar_training_provider" v-model="trainingSeminar.training_provider" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td colspan="2" class="border border-slate-300 p-1 gap-4">
                    <div class="flex gap-2 p-2">
                        <button v-if="index > 0 && editable" class="bg-red-600 text-white" @click="deleteSeminarTraining(index)">
                            <Icon name="ion:minus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="index === information.employee_seminartraining.length - 1 && editable" class="bg-green-600 text-white" @click="addSeminarAndTraining()">
                            <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && !trainingSeminar.id" class="bg-green-600 text-white" @click="saveUpdateSeminarTraining(trainingSeminar)">
                            <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && trainingSeminar.id" class="bg-yellow-400 text-white" @click="updateSeminarTrainingData(trainingSeminar, trainingSeminar.id)">
                            <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && trainingSeminar.id" class="bg-red-600 text-white" @click="deleteSeminarTrainingData(trainingSeminar.id)">
                            <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <table v-else>
        <table>
            <tbody>
                <tr>
                    <td>
                        <button v-if="editable" class="bg-green-600 text-white" @click="addSeminarAndTraining()">
                            <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </table>
</template>
