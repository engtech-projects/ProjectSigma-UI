<script setup>
import { storeToRefs } from "pinia"
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"

const showModal = defineModel("showModal", { required: false, type: Boolean })
defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const leaveReqStore = useLeaveRequest()
const { remarks } = storeToRefs(leaveReqStore)
const voidRemarks = ref("")

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await leaveReqStore.approvedRequest(id)
        snackbar.add({
            type: "success",
            text: leaveReqStore.successMessage
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
        await leaveReqStore.denyRequest(id)
        snackbar.add({
            type: "success",
            text: leaveReqStore.successMessage
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
        await leaveReqStore.voidRequest(id, voidRemarks.value)
        snackbar.add({
            type: "success",
            text: leaveReqStore.successMessage,
        })
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
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="LEAVE REQUEST">
        <template #body>
            <HrmsLeaveRequestDetails :leave-data="data" />
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
                    secondary-title="Are you sure you want to void this leave request?"
                    secondary-button-title="Submit Void Request"
                    secondary-button-color="bg-red-600"
                    remarks-title="Reason for Voiding"
                    @click="voidRequest(data.id)"
                />
            </div>
        </template>
    </PsModal>
</template>
