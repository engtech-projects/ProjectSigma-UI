<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const { data: userData } = useAuth()
defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const genpayrollstore = useGeneratePayrollStore()

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id: any) => {
    try {
        boardLoading.value = true
        const approveData = await genpayrollstore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: approveData.message ?? genpayrollstore.approval.successMessage
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
        await genpayrollstore.denyApprovalForm(id, denyRemarks.value)
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

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Payroll">
        <template #body>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Payroll Date: </span> <span class="text-gray-900">{{ data.payroll_date }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Charged To: </span> {{ data.charging_name }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Cutoff Start: </span> {{ data.cutoff_start }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Cutoff End: </span> {{ data.cutoff_end }}
                </div>
                <div v-if="data.advance_days > 0" class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Advance Days: </span> {{ data.advance_days }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Payroll Type: </span> {{ data.payroll_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Release Type: </span> {{ data.release_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Prepared by: </span> {{ data.created_by }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Prepared on: </span> {{ data.created_at_human }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Request Status: </span> {{ data.request_status }}
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
            <LayoutPrint>
                <div class="w-full">
                    <LazyHrmsPayrollSalaryRequestInfoTable :payroll-request="data" />
                </div>
                <div class="showOnPrint">
                    <LayoutApprovalsListView v-if="data.request_status.toLowerCase() === 'approved'" :approvals="data.approvals" :is-approved="data.request_status.toLowerCase() === 'approved'" />
                </div>
            </LayoutPrint>
            <LayoutPrint>
                <div class="w-full">
                    <HrmsPayrollSalaryChargingTable :payroll-request="data" />
                </div>
                <div class="showOnPrint">
                    <LayoutApprovalsListView v-if="data.request_status.toLowerCase() === 'approved'" :approvals="data.approvals" :is-approved="data.request_status.toLowerCase() === 'approved'" />
                </div>
            </LayoutPrint>
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
        </template>
    </PsModal>
</template>
<style scoped>
.showOnPrint {
    display: none;
}
@media print {
    .showOnPrint {
        display: block;
    }
}
</style>
