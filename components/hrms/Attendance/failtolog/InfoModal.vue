<script setup>
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const failtologs = useFailToLogStore()
const { remarks } = storeToRefs(failtologs)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await failtologs.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: failtologs.successMessage
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
        await failtologs.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: failtologs.successMessage
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
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="FAILURE TO LOG">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">Failure to Log</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Employee Name: </span> <span class="text-gray-900">{{ data.employee.fullname_first }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium"> Date: </span> <span class="text-gray-900">{{ data.date_human }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Time: </span> {{ data.time_human }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Log Type: </span> {{ data.log_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light font-medium">Reason: </span> {{ data.reason }}
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end">
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
