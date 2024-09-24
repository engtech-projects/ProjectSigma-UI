<script lang="ts" setup>
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"
import { useApprovalStore, APPROVAL_SALARYDISBURSEMENT } from "@/stores/hrms/setup/approvals"
import { PAYROLL_TYPE, RELEASE_TYPE } from "@/stores/hrms/payroll/generatePayroll"
const salaryDisbursementStore = useSalaryDisbursementStore()
const { generateDraftRequest } = storeToRefs(salaryDisbursementStore)
const approvals = useApprovalStore()
generateDraftRequest.value.data.approvals = await approvals.getApprovalByName(APPROVAL_SALARYDISBURSEMENT)
const showDraftModal = ref(false)
const snackbar = useSnackbar()
const submitForm = async () => {
    try {
        await salaryDisbursementStore.generateDraft()
        snackbar.add({ type: "success", text: "Payroll Draft Successfully Generated." })
        showDraftModal.value = true
    } catch (error) {
        snackbar.add({ type: "error", text: error })
    }
}
</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="generateDraftRequest.isLoading">
        <div class="mt-5 mb-6">
            <form @submit.prevent="submitForm">
                <div class="mt-5 mb-5 grid gap-4">
                    <div class="w-full flex gap-2 md:flex-row flex-col">
                        <LayoutFormPsDateInput v-model="generateDraftRequest.data.payroll_date" class="w-full" title="Payroll Date" required />
                        <LayoutFormPsSelect
                            v-model="generateDraftRequest.data.payroll_type"
                            :options-list="PAYROLL_TYPE"
                            title="Payroll Type"
                            class="w-full p-2"
                            required
                        />
                        <LayoutFormPsSelect
                            v-model="generateDraftRequest.data.release_type"
                            :options-list="RELEASE_TYPE"
                            title="Release Type"
                            class="w-full p-2"
                            required
                        />
                    </div>
                </div>
                <div class="w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in generateDraftRequest.data.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="generateDraftRequest.data.approvals[apr]"
                    />
                </div>

                <div class="flex flex-row justify-between">
                    <div>
                        <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Generate Salary Disbursement Request Draft
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </LayoutLoadingContainer>
    <HrmsPayrollSalaryDisbursementDraftModal v-model:show-modal="showDraftModal" />
</template>
<style scoped>

</style>
