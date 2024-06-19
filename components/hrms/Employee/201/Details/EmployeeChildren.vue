<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const { information, editable } = storeToRefs(employee)
const snackbar = useSnackbar()

const addChild = () => {
    information.value.child.push({
        id: null,
        name: "",
        employee_id: employee.information.id,
        zip: null,
        brgy: null,
        city: null,
        contact_no: null,
        date_of_birth: null,
        occupation: null,
        province: null,
        age: null,
        relationship: null,
        street: null,
        type: EMPLOYMENT_CHILD,
        isEdited: false,
        updated_at: null,
        created_at: null,
        deleted_at: null,
    })
}
addChild()
const deleteChild = (index) => {
    information.value.child.splice(index, 1)
}
const saveUpdateChild = async (index) => {
    try {
        const formData = new FormData()
        Object.keys(information.value.child[index]).forEach(key => formData.append(key, information.value.child[index][key]))
        await employee.saveRelatedPerson(formData)
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
const updateChildData = async (id) => {
    try {
        const formData = new FormData()
        formData.append("children", information.value.child)
        await employee.updateRelatedPerson(formData, id)
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
const deleteChildData = async (id, index) => {
    try {
        await employee.deleteRelatedPerson(id)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
        deleteChild(index)
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
            Employee Children Information
        </label>
    </div>
    <table class="w-full border-collapse border border-slate-300 table-fixed">
        <tbody>
            <tr v-for="(child, index) in information.child" :key="index">
                <td colspan="2" class="border border-slate-300 p-1">
                    <div>
                        <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">NAME OF CHILD</label>
                        <input v-model="child.name" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                    </div>
                </td>
                <td colspan="2" class="border border-slate-300 p-1 gap-4">
                    <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE OF BIRTH</label>
                    <div class="flex gap-2 p-2">
                        <input v-model="child.date_of_birth" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" :disabled="!editable">
                        <button v-if="index > 0 && editable" class="bg-red-600 text-white" @click="deleteChild(index)">
                            <Icon name="ion:minus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="index === information.child.length - 1 && editable" class="bg-green-600 text-white" @click="addChild()">
                            <Icon name="ion:plus" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && !child.id" class="bg-green-600 text-white" @click="saveUpdateChild(index)">
                            <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && child.id" class="bg-yellow-400 text-white" @click="updateChildData(child.id)">
                            <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                        <button v-if="editable && child.id" class="bg-red-600 text-white" @click="deleteChildData(child.id, index)">
                            <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
