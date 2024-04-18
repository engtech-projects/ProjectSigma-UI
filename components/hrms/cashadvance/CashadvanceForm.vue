<script setup lang="ts">
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"
import { useApprovalStore, APPROVAL_CA } from "@/stores/hrms/setup/approvals"

const approvals = useApprovalStore()

const cashadvances = useCashadvanceStore()
const { cashadvance, errorMessage, successMessage } = storeToRefs(cashadvances)

cashadvance.value.approvals = await approvals.getApprovalByName(APPROVAL_CA)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const submitForm = async () => {
    try {
        boardLoading.value = true
        await cashadvances.createRequest()
        if (cashadvances.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: cashadvances.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: cashadvances.successMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: cashadvances.errorMessage
        })
    } finally {
        cashadvances.clearMessages()
        boardLoading.value = false
    }
}
</script>

<template>
    <LayoutBoards title="Cash Advance Request Form" class="w-full" :loading="boardLoading">
        <div class="text-gray-500">
            <form @submit.prevent="submitForm">
                <div class="gap-2 p-2">
                    <div>
                        <label for="empName" class="text-sm font-semibold text-gray-700">Employee Name</label>
                        <HrmsCommonUserEmployeeSelector v-model="cashadvance.employee_id" title="Employee Name" name="Employee Name" />
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-2 p-2">
                    <div>
                        <label for="project" class="text-sm font-semibold text-gray-700">Project</label>
                        <HrmsCommonProjectSelector v-model="cashadvance.project_id" :use-hrms-id="true" />
                    </div>
                    <div>
                        <label for="dept" class="text-sm font-semibold text-gray-700">Department</label>
                        <HrmsCommonDepartmentSelector v-model="cashadvance.department_id" />
                    </div>
                    <LayoutFormPsNumberInput v-model="cashadvance.amount_requested" title="Amount Requested" name="Amount Requested" />
                    <LayoutFormPsNumberInput v-model="cashadvance.amount_approved" title="Amount Approved" name="Amount Approved" />
                    <LayoutFormPsTextInput v-model="cashadvance.terms_of_cash_advance" title="Terms of Cash Advance" name="Amount Requested" />
                    <LayoutFormPsTextInput v-model="cashadvance.purpose" title="Purpose/Reason(s)" name="Purpose/Reason(s)" />
                    <LayoutFormPsTextInput v-model="cashadvance.remarks" title="Remarks" name="Remarks" />
                    <HrmsCommonRequestedBy title="Released By" class="p-2 font-medium text-blue-800 italic" />
                </div>
                <div class="w-full rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in cashadvance.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="cashadvance.approvals[apr]"
                    />
                </div>

                <div class="flex justify-end pb-2">
                    <button type="submit" class="flex text-white p-2 rounded-lg bg-teal-600 content-center mt-5">
                        Submit Form
                    </button>
                </div>
            </form>
            <p
                hidden
                class=" text-red-600 text-center font-semibold mt-2 italic"
                :class="{ 'fade-out': !errorMessage }"
            >
                {{ errorMessage }}
            </p>
            <p
                v-show="successMessage"
                hidden
                class=" text-green-600 text-center font-semibold italic transition-opacity delay-1000"
            >
                {{ successMessage }}
            </p>
        </div>
    </LayoutBoards>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
