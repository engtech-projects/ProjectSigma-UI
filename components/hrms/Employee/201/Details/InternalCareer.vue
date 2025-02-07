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
        <template v-if="editable">
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
                                <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {{ emprecord.work_location }}
                                </p>
                            </td>
                            <td class="border border-slate-300 p-1">
                                <template v-if="emprecord.work_location == 'Office'">
                                    <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Department</label>
                                    <HrmsCommonDepartmentSelector v-if="editable" v-model="emprecord.department_id" />
                                    <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        "{{ emprecord.department_name }}"
                                    </p>
                                </template>
                                <template v-else>
                                    <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Project(s)</label>
                                    <template v-if="editable">
                                        <template v-for="_proj, projInd in emprecord.project_ids" :key="'proj_'+projInd+''">
                                            <HrmsCommonProjectSelector v-model="emprecord.projects[projInd]" />
                                        </template>
                                    </template>
                                    <p v-else class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        "{{ emprecord.project_names }}"
                                    </p>
                                </template>
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
        </template>
        <template v-else>
            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Current Employment</label>
            <table class="w-full border-collapse border border-slate-400 table-fixed">
                <tbody>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">EMPLOYMENT DATES</label>
                            <div class="flex-1 justify-center items-center gap-2">
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">FROM:</label>
                                    <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {{ employeeInformation?.employee_internal[0]?.date_from }}
                                    </p>
                                </div>
                                <div class="flex justify-start items-center gap-1">
                                    <label class="block mb-2 text-[10px] font-normal text-gray-900 dark:text-white italic">TO:</label>
                                    <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {{ employeeInformation?.employee_internal[0]?.date_to }}
                                    </p>
                                </div>
                            </div>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">SALARY</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                Salary Grade {{ employeeInformation?.employee_internal[0]?.employee_salarygrade?.salary_grade_level.salary_grade_level }} - Step {{ employeeInformation?.employee_internal[0]?.employee_salarygrade?.step_name }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Immediate Supervisor</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ employeeInformation?.employee_internal[0]?.immediate_supervisor }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Position</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ employeeInformation?.employee_internal[0]?.position.name }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Employment Status</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ employeeInformation?.employee_internal[0]?.employment_status }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Hire Source</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ employeeInformation?.employee_internal[0]?.hire_source }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Work Location</label>
                            <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {{ employeeInformation?.employee_internal[0]?.work_location }}
                            </p>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <template v-if="employeeInformation?.employee_internal[0]?.work_location == 'Office'">
                                <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Department</label>
                                <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    "{{ employeeInformation?.employee_internal[0]?.department_name }}"
                                </p>
                            </template>
                            <template v-else>
                                <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Project(s)</label>
                                <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    "{{ employeeInformation?.employee_internal[0]?.project_names }}"
                                </p>
                            </template>
                        </td>
                        <td class="border border-slate-300 p-1">
                            <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Salary Type</label>
                            <div>
                                <p class="block w-full p-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-normal dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    "{{ employeeInformation?.employee_internal[0]?.salary_type }}"
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <template v-if="employeeInformation.employee_internal.slice(1).length > 0">
                <label class="block mb-2 text-[11px] font-medium text-gray-900 dark:text-white">Previous Employment</label>
                <table>
                    <thead>
                        <tr>
                            <th>Employment Date</th>
                            <th>Salary</th>
                            <th>Immediate Supervisor</th>
                            <th>Position</th>
                            <th>Employment Status</th>
                            <th>Hire Source</th>
                            <th>Work Location</th>
                            <th>Department/Project</th>
                            <th>Salary Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(emprecord, index) in employeeInformation.employee_internal.slice(1)" :key="index">
                            <td>{{ emprecord.date_from }} - {{ emprecord.date_to }}</td>
                            <td>Salary Grade {{ emprecord.employee_salarygrade?.salary_grade_level.salary_grade_level }} - Step {{ emprecord.employee_salarygrade?.step_name }} </td>
                            <td>{{ emprecord.immediate_supervisor }}</td>
                            <td>{{ emprecord.position.name }}</td>
                            <td>{{ emprecord.employment_status }}</td>
                            <td>{{ emprecord.hire_source }}</td>
                            <td>{{ emprecord.work_location }}</td>
                            <td>
                                <template v-if="emprecord.work_location == 'Office'">
                                    {{ emprecord.department_name }}
                                </template>
                                <template v-else>
                                    {{ emprecord.project_names }}
                                </template>
                            </td>
                            <td>{{ emprecord.salary_type }}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </template>
    </div>
</template>
<style scoped>
td, th {
    @apply border border-slate-300 p-1;
}
</style>
