<script setup lang="ts">
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"

const { data: userData } = useAuth()
defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const resourceStore = useSalaryDisbursementStore()

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id: any) => {
    try {
        boardLoading.value = true
        await resourceStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: "Successfully Approved."
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const denyRemarks = ref("")
const denyRequest = async (id : any) => {
    try {
        boardLoading.value = true
        await resourceStore.denyApprovalForm(id, denyRemarks.value)
        snackbar.add({
            type: "success",
            text: "Successfully Denied"
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const submitToAccounting = async (id: any) => {
    try {
        await resourceStore.submitToAccounting(id)
        snackbar.add({
            type: "success",
            text: "Successfully submitted to accounting."
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Salary Disbursement Request">
        <template #body>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Payroll Date: </span> <span class="text-gray-900">{{ data.payroll_date_human }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Payroll Type: </span> {{ data.payroll_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Release Type: </span> {{ data.release_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Requested By: </span>
                    {{ data.created_by_user_name }}<br>{{ data.created_at_human }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Request Status: </span> {{ data.request_status }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Disbursement Status: </span> {{ data.disbursement_status }}
                </div>
            </div>
            <div class="w-full">
                <HrmsPayrollSalaryDisbursementDetailsTable :data="data" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="denyRemarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
            <div v-if="data.request_status === 'Approved'">
                <LayoutFormPsButton button-title="Submit to Accounting" @click="submitToAccounting" />
            </div>
        </template>
    </PsModal>
</template>
