<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const overtimes = useOvertimeStore()
const { remarks } = storeToRefs(overtimes)
const voidRemarks = ref("")

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await overtimes.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
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
        await overtimes.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
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
        await overtimes.voidRequest(id, voidRemarks.value)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage,
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
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <HrmsOvertimeRequestDetails :overtime-data="data" />
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
                    secondary-title="Are you sure you want to void this Overtime request?"
                    secondary-button-title="Submit Void Request"
                    secondary-button-color="bg-red-600"
                    remarks-title="Reason for Voiding"
                    @click="voidRequest(data.id)"
                />
            </div>
        </template>
    </PsModal>
</template>
