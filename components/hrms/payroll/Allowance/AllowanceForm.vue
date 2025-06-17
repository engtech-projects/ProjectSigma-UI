<script setup lang="ts">
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
import { useApprovalStore, APPROVAL_GA } from "@/stores/hrms/setup/approvals"

const genallowstore = useGenerateAllowanceStore()
const { generateDraftRequest } = storeToRefs(genallowstore)

const approvals = useApprovalStore()
generateDraftRequest.value.data.approvals = await approvals.getApprovalByName(APPROVAL_GA)

const snackbar = useSnackbar()
const showDraftModal = ref(false)

const submitForm = async () => {
    try {
        await genallowstore.generateDraft()
        snackbar.add({
            type: "success",
            text: "Successfully created Allowance Draft."
        })
        showDraftModal.value = true
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
const dateChanged = computed(() => {
    if (generateDraftRequest.value.data.cutoff_start && generateDraftRequest.value.data.cutoff_end) {
        generateDraftRequest.value.data.total_days = 1
        const dateStart = new Date(generateDraftRequest.value.data.cutoff_start)
        const dateEnd = new Date(generateDraftRequest.value.data.cutoff_end)
        const dsMin = dateStart.setMinutes(dateStart.getMinutes() - dateStart.getTimezoneOffset())
        const deMin = dateEnd.setMinutes(dateEnd.getMinutes() - dateEnd.getTimezoneOffset())
        generateDraftRequest.value.data.total_days = (deMin - dsMin) / (24 * 60 * 60 * 1000) + 1
    }
})

</script>
<template>
    <LayoutLoadingContainer class="w-full" :loading="generateDraftRequest.isLoading">
        <div class="mt-5 mb-6">
            <form @submit.prevent="submitForm">
                <HrmsCommonDetailedMultipleEmployeeSelector v-model="generateDraftRequest.data.employees" title="Employee Name" name="Employee Name" />
                <div class="mt-5 mb-5 grid gap-4">
                    <div class="w-full flex gap-2 md:flex-row flex-col">
                        <LayoutFormPsDateInput v-model="generateDraftRequest.data.cutoff_start" class="w-full" title="Cut-off Date (Start)" @change="dateChanged" />
                        <LayoutFormPsDateInput v-model="generateDraftRequest.data.cutoff_end" class="w-full" title="Cut-off Date (End)" @change="dateChanged" />
                        <LayoutFormPsDateInput v-model="generateDraftRequest.data.allowance_date" class="w-full" title="Allowance Date" />
                    </div>
                    <div class="w-full flex gap-2 p-2 md:flex-row flex-col">
                        <LayoutFormPsNumberInput v-model="generateDraftRequest.data.total_days" class="md:w-1/3 w-full" title="Total Day(s)" />
                        <HrmsCommonDepartmentProjectSelector
                            v-model:select-type="generateDraftRequest.data.charging_type"
                            v-model:department-id="generateDraftRequest.data.department_id"
                            v-model:project-id="generateDraftRequest.data.project_id"
                            class="md:w-1/3 w-full"
                            title="Charging"
                        />
                    </div>
                </div>
                <div class="w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                    <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals:</label>
                    <HrmsSetupApprovalsList
                        v-for="(approv, apr) in generateDraftRequest.data.approvals"
                        :key="'hrmsetupapprovallist'+apr"
                        v-model="generateDraftRequest.data.approvals[apr]"
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
    </LayoutLoadingContainer>
    <HrmsPayrollAllowanceDraftModal v-model:show-modal="showDraftModal" />
</template>
