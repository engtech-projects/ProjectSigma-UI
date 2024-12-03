<script setup>
import { storeToRefs } from "pinia"
import { useEmployeeInfo } from "@/stores/hrms/employee"
import { USER_ADMINISTRATOR } from "@/stores/hrms/setup/users"
const employee = useEmployeeInfo()
const snackbar = useSnackbar()
const { data: userData } = useAuth()
const { information: employeeInformation, editable: editMode } = storeToRefs(employee)
const editable = computed(() => editMode.value && userData.value?.type === USER_ADMINISTRATOR)

const updateInternalWorkExperience = async (id, params) => {
    // boardLoading.value = true
    try {
        await employee.updateInternalWorkExperience(params, id)
        snackbar.add({
            type: "success",
            text: employee.successMessage
        })
        employee.getEmployeeInformation(id)
        // boardLoading.value = false
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
        // boardLoading.value = false
    }
}
</script>
<template>
    <div>
        <label for="company_info" class="block mb-2 text-md font-medium text-gray-900 dark:text-white mt-6 italic">
            Internal Work Experience/History
        </label>
        <form v-for="(emprecord, index) in employeeInformation.employee_internal" :key="index" action="">
            <table class="w-full border-collapse border border-slate-400 table-fixed">
                <tbody>
                    <tr v-if="editable">
                        <div class="flex gap-2 p-2">
                            <button v-if="editable && emprecord.id" class="bg-yellow-400 text-white" @click.prevent="updateInternalWorkExperience(emprecord.id, emprecord)">
                                <Icon name="ion:pencil" color="white" class="rounded h-6 w-6 p-1" />
                            </button>
                        </div>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">EMPLOYMENT DATES</label>
                            <div class="flex-1 justify-center items-center gap-2">
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                                    <input v-if="editable" v-model="emprecord.date_from" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {{ emprecord.date_from }}
                                    </p>
                                </div>
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                                    <input v-if="editable" v-model="emprecord.date_to" type="date" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {{ emprecord.date_to }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">SALARY</label>
                            <HrmsCommonSalaryGradeSelector v-if="editable" v-model="emprecord.salary_grades" />
                            <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                Salary Grade {{ emprecord.employee_salarygrade?.salary_grade_level.salary_grade_level }} - Step {{ emprecord.employee_salarygrade?.step_name }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Immediate Supervisor</label>
                            <input v-if="editable" v-model="emprecord.immediate_supervisor" type="text" class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.immediate_supervisor }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Position</label>
                            <HrmsCommonPositionSelector v-if="editable" v-model="emprecord.position_id" />
                            <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.position.name }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Employment Status</label>
                            <HrmsCommonEmploymentStatusSelector v-if="editable" v-model="emprecord.employment_status" />
                            <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.employment_status }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Hire Source</label>
                            <HrmsCommonEmploymentHireSourceSelector v-if="editable" v-model="emprecord.hire_source" />
                            <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.hire_source }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Work Location</label>
                            <HrmsCommonEmploymentWorkLocationSelector v-if="editable" v-model="emprecord.work_location" />
                            <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ emprecord.work_location }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Department</label>
                            <HrmsCommonDepartmentSelector v-if="editable" v-model="emprecord.department_id" />
                            <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                "{{ emprecord.employee_department?.department_name }}"
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Salary Type</label>
                            <div>
                                <HrmsCommonEmploymentSalaryTypeSelector v-if="editable" v-model="emprecord.salary_type" />
                                <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    "{{ emprecord.salary_type }}"
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>
