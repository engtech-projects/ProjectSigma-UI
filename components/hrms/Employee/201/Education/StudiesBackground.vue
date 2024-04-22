<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"

const employee = useEmployeeInfo()
const boardLoading = ref(false)
const updateEmployeeEducation = (category) => {
    return category
}
const appendStudies = (category) => {
    const data = { id: null, employee_id: information.value.id, date: null, title: null, type: category }
    if (category === "master thesis") {
        employee.information.masterstudies.push(data)
    }
    if (category === "doctor dissertation") {
        employee.information.doctorstudies.push(data)
    }
    if (category === "professional license") {
        employee.information.professionalstudies.push(data)
    }
}
const { information, editable } = storeToRefs(employee)
</script>
<template>
    <div class="flex justify-start mt-3 gap-3">
        <label for="employeeinfo" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-4 italic">
            Employee Secondary Education
        </label>
    </div>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <table class="w-full border-collapse border border-slate-400 table-fixed">
            <tbody>
                <tr v-if="information.masterstudies">
                    <td class="border border-slate-300 p-1">
                        <div>
                            <p class="flex-1 text-[11px] w-32 font-medium text-gray-900 dark:text-white">
                                MASTER THESIS
                            </p>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="master_title" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="master_title" v-model="information.masterstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="masters_date" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="masters_date" v-model="information.masterstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td v-if="editable" class="border border-slate-300 p-1 justify-center">
                        <div class="w-full flex gap-2">
                            <button
                                v-if="!information.masterstudies"
                                class=" bg-green-600 text-white w-7 h-7"
                                @click="updateEmployeeEducation('master thesis')"
                            >
                                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-if="information.masterstudies"
                                class=" bg-yellow-400 text-white w-7 h-7"
                                @click="updateEmployeeEducation('master thesis')"
                            >
                                <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-if="information.masterstudies"
                                class=" bg-red-600 text-white w-7 h-7"
                                @click="updateEmployeeEducation('master thesis')"
                            >
                                <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                        </div>
                    </td>
                </tr>
                <tr v-else>
                    <button
                        class=" bg-green-600 text-white w-7 h-7"
                        @click="appendStudies('masters')"
                    >
                        <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                    </button>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <p class="flex-1 text-[11px] w-full font-medium text-gray-900 dark:text-white">
                                DOCTOR DISSERTATION
                            </p>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="doctor_title" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="doctor_title" v-model="information.doctorstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="doctor_date" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="doctor_date" v-model="information.doctorstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td v-if="editable" class="border border-slate-300 p-1 justify-center">
                        <div class="w-full flex gap-2">
                            <button
                                v-if="!information.doctorstudies"
                                class=" bg-green-600 text-white w-7 h-7"
                                @click="updateEmployeeEducation('doctorstudies')"
                            >
                                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-if="information.doctorstudies"
                                class=" bg-yellow-400 text-white w-7 h-7"
                                @click="updateEmployeeEducation('doctorstudies')"
                            >
                                <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-if="information.doctorstudies"
                                class=" bg-red-600 text-white w-7 h-7"
                                @click="updateEmployeeEducation('doctorstudies')"
                            >
                                <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <p class="block text-[11px] w-full font-medium text-gray-900 dark:text-white">
                                PROFESSIONAL LICENSE (e.g, CPA, RN, etc.)
                            </p>
                        </div>
                    </td>
                    <td colspan="2" class="border border-slate-300 p-1">
                        <div>
                            <label for="proflicence_title" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">TITLE</label>
                            <input id="proflicence_title" v-model="information.professionalstudies.title" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td class="border border-slate-300 p-1">
                        <div>
                            <label for="proflicence_date" class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">DATE</label>
                            <input id="proflicence_date" v-model="information.professionalstudies.date" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                    </td>
                    <td v-if="editable" class="border border-slate-300 p-1 justify-center">
                        <div class="w-full flex gap-2">
                            <button
                                v-if="!information.professionalstudies"
                                class=" bg-green-600 text-white w-7 h-7"
                                @click="updateEmployeeEducation('professionalstudies')"
                            >
                                <Icon name="ion:save" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-if="information.professionalstudies"
                                class=" bg-yellow-400 text-white w-7 h-7"
                                @click="updateEmployeeEducation('professionalstudies')"
                            >
                                <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                            <button
                                v-if="information.professionalstudies"
                                class=" bg-red-600 text-white w-7 h-7"
                                @click="updateEmployeeEducation('professionalstudies')"
                            >
                                <Icon name="ion:trash" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </LayoutBoards>
</template>
