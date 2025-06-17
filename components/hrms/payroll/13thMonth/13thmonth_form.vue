<script setup lang="ts">
import { use13thMonthStore, FORM_APPROVAL_NAME } from "@/stores/hrms/payroll/13thmonth"
import { useApprovalStore } from "~/stores/hrms/setup/approvals"
const dataStore = use13thMonthStore()
const approval = useApprovalStore()
const snackbar = useSnackbar()
const { generateDraftRequest, createApprovalsBackup } = storeToRefs(dataStore)
const showAdvance = ref(false)
const showDraftModal = ref(false)
const submitForm = async () => {
    try {
        await dataStore.generateDraft()
        showDraftModal.value = true
        snackbar.add({ type: "success", text: "Payroll Draft Successfully Generated." })
    } catch (error) {
        snackbar.add({ type: "error", text: error })
    }
}
watch(showAdvance, (val) => {
    if (!val) {
        generateDraftRequest.value.data.days_advance = 0
        generateDraftRequest.value.data.charging_type = ""
        generateDraftRequest.value.data.charging_id = null
    }
})
createApprovalsBackup.value = await approval.getApprovalByName(FORM_APPROVAL_NAME)

</script>
<template>
    <div class="flex flex-col gap-2">
        <HrmsCommonDetailedMultipleEmployeeSelector v-model="generateDraftRequest.data.employee_ids" title="Employee Name" name="Employee Name" />
        <div class="w-full flex gap-2 md:flex-row flex-col">
            <LayoutFormPsDateInput v-model="generateDraftRequest.data.date_from" class="w-full" title="Cut-off Date (Start)" />
            <LayoutFormPsDateInput v-model="generateDraftRequest.data.date_to" class="w-full" title="Cut-off Date (End)" />
            <LayoutFormPsDateInput v-model="generateDraftRequest.data.date_requested" class="w-full" title="Release Date" />
        </div>
        <div class="w-full flex gap-2 md:flex-row flex-col ">
            <div class="flex items-center">
                <input id="showAdvance" v-model="showAdvance" type="checkbox" :true-value="true" :false-value="false">
                <label for="showAdvance">Show Advance</label>
            </div>
            <LayoutFormPsNumberInput v-show="showAdvance" v-model="generateDraftRequest.data.days_advance" title="Advance Days" class="md:w-1/3 w-full" />
            <HrmsCommonDepartmentProjectSelector
                v-show="showAdvance"
                v-model:select-type="generateDraftRequest.data.charging_type"
                v-model:department-id="generateDraftRequest.data.charging_id"
                v-model:project-id="generateDraftRequest.data.charging_id"
                :use-class-charge-type="true"
                class="md:w-1/3 w-full"
                title="Charging"
                :required="generateDraftRequest.data.days_advance > 0"
            />
        </div>
        <div class="w-full flex gap-2 md:flex-row flex-col">
            <div class="w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals:</label>
                <HrmsSetupApprovalsList
                    v-for="(approv, apr) in createApprovalsBackup"
                    :key="'13thMonthApprovalsListItem'+apr"
                    v-model="createApprovalsBackup[apr]"
                />
            </div>
        </div>
        <div class="w-full flex gap-2 md:flex-row flex-col">
            <div class="w-full md:w-1/5">
                <button
                    type="button"
                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    @click="submitForm"
                >
                    Generate 13th Month
                </button>
            </div>
        </div>
        <HrmsPayroll13thMonthDraftModal v-model:show-modal="showDraftModal" />
    </div>
</template>
