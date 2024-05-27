<script  setup lang="ts">
import { useGeneratePayrollStore, PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"
import { useApprovalStore, APPROVAL_GP } from "@/stores/hrms/setup/approvals"

const genpayrollstore = useGeneratePayrollStore()
const { generateParams } = storeToRefs(genpayrollstore)

const approvals = useApprovalStore()
generateParams.value.approvals = await approvals.getApprovalByName(APPROVAL_GP)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const setEmployee = (adjustIndex: number, emp: { id: any }) => {
    generateParams.value.adjustment[adjustIndex].id = emp.id
}

const addAdjustment = () => {
    generateParams.value.adjustment.push({ id: "", adjustment_name: "", adjustment_amount: "" })
}

const delAdjustment = (adjustIndex: any) => {
    generateParams.value.adjustment.splice(adjustIndex, 1)
}

const showInformationModal = ref(false)

const showInformation = () => {
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

// const payrollDraft = ref([])

const submitForm = async () => {
    try {
        boardLoading.value = true
        await genpayrollstore.generatePayrollDraft()
        // payrollDraft.value = generatedList
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
    <LayoutBoards title="Generate Payroll" class="w-full" :loading="boardLoading">
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

                <div>
                    <div hidden>
                        <div class="z-40 mb-5 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
                                <div class="flex items-center justify-between align">
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

                                <div v-for="(adjust, adjustIndex) in generateParams.adjustment" :key="adjustIndex" class="grid md:grid-cols-2 md:gap-2 pb-4">
                                    <!-- {{ adjust }} -->
                                    <div>
                                        <label for="" class="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Employee Name</label>
                                        <SearchBar class="flex" @search-changed="emp => setEmployee(adjustIndex, emp)" />
                                    </div>
                                    <div class="justify-items-end ml-auto">
                                        <button v-if="adjustIndex > 0" class="delete-button " title="Remove Adjustment" @click.prevent="delAdjustment(adjustIndex)">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-8 h-8 text-red-600 hover:text-red-400"
                                            ><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </button>
                                    </div>
                                    <div>
                                        <LayoutFormPsTextInput v-model="adjust.adjustment_name" title="Adjustment Name" class="flex-auto" />
                                    </div>
                                    <div>
                                        <LayoutFormPsNumberInput v-model="adjust.adjustment_amount" title="Adjustment Amount" class="flex-auto" />
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="w-full max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6 overflow-auto">
                    <label for="" class="text-xl font-semibold text-gray-900">Waive Fees</label>
                    <div class="mt-4 flex flex-col">
                        <div class="mb-5 grid grid-cols-1 gap-6 sm:grid-cols-4">
                            <div>
                                <label for="employee" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee</label>
                                <input id="employee" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
                            </div>
                            <div>
                                <label for="fee_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fee Type</label>
                                <select id="cutoff_dates" name="cutoff_dates" class="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600 focus:outline-none dark:placeholder-gray-400 text-sm">
                                    <option value="1">
                                        Cash Advance
                                    </option>
                                    <option value="2">
                                        Loan
                                    </option>
                                    <option value="3">
                                        Other Deduction
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label for="fee_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fee Name</label>
                                <input id="fee_name" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex justify-end items-center">
                                <button type="submit" class="mt-5 min-w-min text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <Icon name="ic:baseline-plus" color="white" class="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div> -->
                        </div>
                    </div>
                    <div class="">
                        <div class="flex flex-row justify-between">
                            <div>
                                <button type="submit" class="text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
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

    <div v-if="showInformationModal" :loading="boardLoading">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                    <div class="flex gap-2 justify-between p-2 ">
                        <p class="text-2xl text-center font-semibold justify-center mx-auto">
                            EVENPAR CONSTRUCTION AND DEVELOPMENT CORPORATION
                        </p>
                        <button
                            title="Close"
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="red" class="w-4 h-4 hover:bg-red-400 hover:rounded-md hover:text-white" />
                        </button>
                    </div>
                    <div class="p-2">
                        <HrmsPayrollGeneratepayrollInformation />
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
