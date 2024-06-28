<script  setup lang="ts">
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
import { useApprovalStore, APPROVAL_GA } from "@/stores/hrms/setup/approvals"

const genallowstore = useGenerateAllowanceStore()
const { generateAllowance } = storeToRefs(genallowstore)

const approvals = useApprovalStore()
generateAllowance.value.approvals = await approvals.getApprovalByName(APPROVAL_GA)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const submitForm = async () => {
    try {
        boardLoading.value = true
        await genallowstore.createRequest()
        if (genallowstore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: genallowstore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: genallowstore.successMessage
            })
        }
        genallowstore.$reset()
        generateAllowance.value.approvals = await approvals.getApprovalByName(APPROVAL_GA)
    } catch {
        snackbar.add({
            type: "error",
            text: genallowstore.errorMessage
        })
    } finally {
        genallowstore.clearMessages()
        genallowances.getMyRequests()
        genallowances.getMyApprovalRequests()
        boardLoading.value = false
    }
}

</script>

<template>
    <LayoutBoards class="w-full" :loading="boardLoading">
        <div class="mt-5 mb-6">
            <form @submit.prevent="submitForm">
                <HrmsCommonDetailedMultipleEmployeeSelector v-model="generateAllowance.employees" title="Employee Name" name="Employee Name" />
                <div class="mt-5 mb-5 flex gap-4 sm:grid-cols-3">
                    <LayoutFormPsDateInput v-model="generateAllowance.cutoff_start" title="Cut-off Date (Start)" />
                    <LayoutFormPsDateInput v-model="generateAllowance.cutoff_end" title="Cut-off Date (End)" />
                    <LayoutFormPsDateInput v-model="generateAllowance.allowance_date" title="Allowance Date" />
                    <LayoutFormPsNumberInput v-model="generateAllowance.total_days" title="Total Day(s)" />
                    <div class="flex-1">
                        <HrmsCommonDepartmentProjectSelector v-model:select-type="generateAllowance.group_type" v-model:department-id="generateAllowance.department_id" v-model:project-id="generateAllowance.project_id" />
                    </div>
                </div>
                <div class="w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Recommending Approval:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in generateAllowance.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="generateAllowance.approvals[apr]"
                    />
                </div>

                <div class="flex flex-row justify-between">
                    <div>
                        <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            Generate Allowance
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </LayoutBoards>
</template>
