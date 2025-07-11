<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const resourceStore = useGenerateAllowanceStore()
const { remarks } = storeToRefs(resourceStore)
const voidRemarks = ref("")

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await resourceStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: resourceStore.successMessage
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
const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await resourceStore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: resourceStore.successMessage
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
const voidRequest = async (id) => {
    try {
        boardLoading.value = true
        const result = await resourceStore.voidRequest(id, voidRemarks.value)
        snackbar.add({
            type: "success",
            text: result?.message || "Request voided successfully"
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error.message || "Something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Allowance Request">
        <template #body>
            <LayoutPrint>
                <HrmsPayrollAllowanceRequestDetails :allowance-data="data" />
            </LayoutPrint>
        </template>
        <template #footer>
            <div v-if="data.next_approval && useCheckIsCurrentUser(data.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
            <div v-if="useCheckIsCurrentUser(data.created_by) && data.request_status.toLowerCase() === 'approved' && useCheckAccessibility([AccessibilityTypes.HRMS_REQUEST_VOID_CREATEREQUEST])" class="flex gap-2 p-2 justify-end relative">
                <LayoutFormPsHoverButton
                    v-model:remarks="voidRemarks"
                    main-button-title="Void"
                    main-button-color="bg-red-600"
                    secondary-title="Are you sure you want to void this Allowance request?"
                    secondary-button-title="Submit Void Request"
                    secondary-button-color="bg-red-600"
                    remarks-title="Reason for Voiding"
                    @click="voidRequest(data.id)"
                />
            </div>
        </template>
    </PsModal>
</template>
