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
            text: genpayrollstore.approval.successMessage ?? approveData
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
const clearRemarks = () => {
    denyRemarks.value = ""
}
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
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Payroll Type: </span> {{ data.payroll_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Release Type: </span> {{ data.release_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Request Status: </span> {{ data.request_status }}
                </div>
            </div>
            <div class="w-full">
                <LazyHrmsPayrollSalaryRequestInfoTable :payroll-request="data" />
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="denyRemarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                    @clear="clearRemarks"
                />
            </div>
        </template>
    </PsModal>
</template>
