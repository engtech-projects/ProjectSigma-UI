<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { information, editable } = storeToRefs(employee)
const snackbar = useSnackbar()

const addExternalCareer = () => {
    information.value.employee_externalwork.push({
        id: null,
        company_name: null,
        date_from: null,
        date_to: null,
        employee_id: information.value.id,
        position_title: null,
        salary: null,
        status_of_appointment: null,
    })
}

const deleteExternalCareer = (index) => {
    information.value.employee_externalwork.splice(index, 1)
}
const saveUpdateExternalCareerData = async (params) => {
    try {
        await employee.saveUpdateExternalCareerData(params)
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
const updateExternalCareerData = async (params, id) => {
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
const deleteExternalCareerData = async (id) => {
    try {
        await employee.deleteExternalCareer(id)
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
            Employee External Work Information
        </label>
    </div>
    <table v-if="information.employee_externalwork.length > 0" class="w-full border-collapse border border-slate-300 table-fixed">
        <tbody v-for="(externalCareer, index) in information.employee_externalwork" :key="index">
            <tr>
                <td class="border-slate-300 p-1 gap-4">
                    <div class="flex gap-2 p-2">
                        <button v-if="index > 0 && editable" class="bg-red-600 text-white" @click="deleteExternalCareer(index)">
                            <Icon name="ion:minus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="index === information.employee_externalwork.length - 1 && editable" class="bg-green-600 text-white" @click="addExternalCareer()">
                            <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && !externalCareer.id" class="bg-green-600 text-white" @click="saveUpdateExternalCareerData(externalCareer)">
                            <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && externalCareer.id" class="bg-yellow-400 text-white" @click="updateExternalCareerData(externalCareer, externalCareer.id)">
                            <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && externalCareer.id" class="bg-red-600 text-white" @click="deleteExternalCareerData(externalCareer.id)">
                            <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="border border-slate-300 p-1">
                    <label class="block mb-2 text-[11px] w-32 font-medium text-gray-900 dark:text-white">COMPANY NAME</label>
                    <input v-model="externalCareer.company_name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                </td>
                <td class="border border-slate-300 p-1 space-y-1">
                    <div class="flex justify-start items-center gap-2">
                        <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">TITLE:</label>
                        <input id="superior_name" v-model="externalCareer.position_title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                    <div class="flex justify-start items-center gap-2">
                        <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">SALARY: </label>
                        <input id="superior_name" v-model="externalCareer.salary" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div class="flex-1 justify-center items-center gap-2">
                        <div class="flex justify-start items-center gap-1">
                            <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                            <input id="superior_name" v-model="externalCareer.date_from" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <div class="flex justify-start items-center gap-1">
                            <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                            <input id="superior_name" v-model="externalCareer.date_to" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </div>
                </td>
                <td class="border border-slate-300 p-1">
                    <div class="flex-1 justify-center items-center gap-2">
                        <div class="flex justify-start items-center gap-1">
                            <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">STATUS OF APPOINTMENT</label>
                            <input id="superior_name" v-model="externalCareer.status_of_appointment" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
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
                        <button v-if="editable" class="bg-green-600 text-white" @click="addExternalCareer()">
                            <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </table>
</template>
