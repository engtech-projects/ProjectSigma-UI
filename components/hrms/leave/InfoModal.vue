<script setup>
import { storeToRefs } from "pinia"
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })
defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const leaveReqStore = useLeaveRequest()
const { remarks } = storeToRefs(leaveReqStore)

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
const clearRemarks = () => {
    remarks.value = ""
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
</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="LEAVE REQUEST">
        <template #body>
            <HrmsLeaveRequestInformation :leave-data="data" />
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                    @clear="clearRemarks"
                />
            </div>
        </template>
    </PsModal>
</template>
