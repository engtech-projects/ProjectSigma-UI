<script  setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
import { useApprovalStore, APPROVAL_GP } from "@/stores/hrms/setup/approvals"

const genpayrollstore = useGeneratePayrollStore()
const { generateParams } = storeToRefs(genpayrollstore)

const approvals = useApprovalStore()
generateParams.value.approvals = await approvals.getApprovalByName(APPROVAL_GP)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const showInformationModal = ref(false)

const showInformation = () => {
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
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
    <LayoutBoards title="Generate Payslip" class="w-full" :loading="boardLoading">
        <div class="mt-5 mb-6 p-2">
            <form @submit.prevent="submitForm">
                <HrmsCommonDetailedMultipleEmployeeSelector v-model="generateParams.employee_ids" title="Employee Name" name="Employee Name" />

                <div class="mt-5 mb-5 flex gap-4 sm:grid-cols-3">
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
                <!-- <div class="pt-5 w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in generateParams.approvals"
                        :key="'hrmsetupapprovallist' + apr"
                        v-model="generateParams.approvals[apr]"
                    />
                </div> -->

                <div>
                    <div class="">
                        <div class="flex flex-row justify-between">
                            <div />
                            <div>
                                <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Generate Payslip
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
                    <div class="flex gap-2 justify-end ml-auto p-2 ">
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
