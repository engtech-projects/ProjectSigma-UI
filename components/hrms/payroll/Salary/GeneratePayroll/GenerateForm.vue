<script  setup lang="ts">
import { useGeneratePayrollStore, PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"
import { useApprovalStore, APPROVAL_GP } from "@/stores/hrms/setup/approvals"

const genpayrollstore = useGeneratePayrollStore()
const { generateParams } = storeToRefs(genpayrollstore)

const approvals = useApprovalStore()
generateParams.value.approvals = await approvals.getApprovalByName(APPROVAL_GP)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEmployee = (adjustIndex, emp) => {
    generateParams.value.adjustments[adjustIndex].employee_id = emp.id
}

const addAdjustment = () => {
    generateParams.value.adjustments.push({ employee_id: "", adjustment_name: "", adjustment_amount: "" })
}

const delAdjustment = (adjustIndex) => {
    generateParams.value.adjustments.splice(adjustIndex, 1)
}

const showInformationModal = ref(false)

const showInformation = () => {
    showInformationModal.value = true
}
const submitForm = async () => {
    try {
        boardLoading.value = true
        await genpayrollstore.generatePayrollDraft()
        snackbar.add({ type: "success", text: "Payroll Draft Successfully Generated." })
        showInformation()
    } catch (error) {
        snackbar.add({ type: "error", text: genpayrollstore.errorMessage })
    } finally {
        genpayrollstore.clearMessages()
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="" class="w-full" :loading="boardLoading">
        <div class="mt-5 mb-6 p-2">
            <form @submit.prevent="submitForm">
                <HrmsCommonDetailedMultipleEmployeeSelector v-model="generateParams.employee_ids" title="Employee Name" name="Employee Name" />

                <div class="mt-5 mb-5 flex gap-4 sm:grid-cols-3">
                    <LayoutFormPsDateInput v-model="generateParams.cutoff_start" title="Cut-off Date (Start)" required />
                    <LayoutFormPsDateInput v-model="generateParams.cutoff_end" title="Cut-off Date (End)" required />
                    <LayoutFormPsDateInput v-model="generateParams.payroll_date" title="Payroll Date" required />

                    <div class="flex-1">
                        <HrmsCommonDepartmentProjectSelector
                            v-model:select-type="generateParams.group_type"
                            v-model:department-id="generateParams.department_id"
                            v-model:project-id="generateParams.project_id"
                            title="Department/Project Charge"
                            required
                        />
                    </div>
                </div>
                <div class="grid grid-cols-3 divide-x pb-4">
                    <div class="p-2">
                        <label for="Less" class="text-md font-semibold text-gray-900 ">Less</label>
                        <div v-for="(item, index) in ['SSS', 'PhilHealth', 'PagIBIG']" :key="index">
                            <input
                                :id="'checked-checkbox' + index"
                                v-model="generateParams['deduct_' + item.toLowerCase()]"
                                type="checkbox"
                                :true-value="1"
                                :false-value="0"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            >
                            <label :for="'checked-checkbox' + index" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ item }}</label>
                        </div>
                    </div>

                    <div class="p-2">
                        <label for="payrollType" class="text-md font-semibold text-gray-900 ">Payroll Type</label>
                        <div v-for="(payrollType, index) in PAYROLL_TYPE" :key="index">
                            <input
                                :id="'payrollType' + index"
                                v-model="generateParams.payroll_type"
                                :value="payrollType"
                                type="radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                            <label :for="'payrollType' + index" class="uppercase ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {{ payrollType }}
                            </label>
                        </div>
                    </div>
                    <div class="p-2">
                        <label for="releaseType" class="text-md font-semibold text-gray-900">Release Type</label>
                        <div v-for="(releaseType, index1) in RELEASE_TYPE" :key="index1">
                            <input
                                :id="'releaseType' + index1"
                                v-model="generateParams.release_type"
                                :value="releaseType"
                                type="radio"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                required
                            >
                            <label :for="'releaseType' + index1" class="uppercase ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {{ releaseType }}
                            </label>
                        </div>
                    </div>
                </div>
                <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in generateParams.approvals"
                        :key="'hrmsetupapprovallist' + apr"
                        v-model="generateParams.approvals[apr]"
                    />
                </div>
                <div class="mb-5 w-2/3 flex flex-row gap-4">
                    <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
                        <div class="flex items-center justify-between">
                            <label for="" class="text-xl font-semibold text-gray-900 pb-2">Adjustment</label>
                            <button class="add-button " title="Add More Adjustment" @click.prevent="addAdjustment">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-8 h-8 text-green-600 hover:text-green-900"
                                ><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </button>
                        </div>
                        <div v-for="adjust, adjustIndex in generateParams.adjustments" :key="adjustIndex" class="flex flex-row gap-x-4 pb-8 items-center justify-between">
                            <div class="w-1/2">
                                <label for="">Employee</label>
                                <SearchBar @search-changed="emp => setEmployee(adjustIndex, emp)" />
                            </div>
                            <LayoutFormPsTextInput v-model="adjust.adjustment_name" title="Adjustment Name" class="w-1/4" :required="false" />
                            <LayoutFormPsNumberInput v-model="adjust.adjustment_amount" title="Adjustment Amount" class="w-1/4" :required="false" />
                            <button class="delete-button " title="Remove Adjustment" @click.prevent="delAdjustment(adjustIndex)">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-8 h-8 text-red-600 hover:text-red-400"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="">
                        <div class="flex flex-row justify-between">
                            <div>
                                <button type="submit" class="text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800" disabled>
                                    BIR WTax Calculator
                                </button>
                            </div>
                            <div>
                                <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Generate Payroll
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </LayoutBoards>
    <PsModal v-model:show-modal="showInformationModal" title="Generate Payroll Draft">
        <template #body>
            <HrmsPayrollSalaryGeneratePayrollDraft v-if="showInformationModal" />
        </template>
    </PsModal>
</template>
