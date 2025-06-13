<script setup lang="ts">
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
const snackbar = useSnackbar()
const { createRequestData, createApprovalsBackup } = storeToRefs(dataStore)

const showModal = defineModel("showModal", { required: false, type: Boolean })
const closeViewModal = () => {
    showModal.value = false
}
const submitForm = async () => {
    try {
        createRequestData.value.data.approvals = createApprovalsBackup.value
        await dataStore.createRequest()
        snackbar.add({ type: "success", text: "13th Month Successfully Generated." })
        closeViewModal()
    } catch (error) {
        snackbar.add({ type: "error", text: error })
    }
}

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="createRequestData.isLoading" title="Salary Disbursement Request">
        <template #body>
            <HrmsPayroll13thMonthResultComputationTable
                :data="createRequestData.resourceData"
                class="mt-4"
            />
            <div class="w-full mb-2 rounded-lg p-4 bg-slate-100 ">
                <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals:</label>
                <HrmsSetupApprovalsList
                    v-for="(approv, apr) in createApprovalsBackup"
                    :key="'13thMonthApprovalsListItem'+apr"
                    v-model="createApprovalsBackup[apr]"
                />
            </div>
        </template>
        <template #footer>
            <div class="flex gap-2 p-2 justify-end relative">
                <LayoutFormPsButton button-title="Submit" @click="submitForm" />
            </div>
        </template>
    </PsModal>
</template>
<style scoped>
</style>
