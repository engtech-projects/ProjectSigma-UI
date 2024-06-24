<script setup>
import { storeToRefs } from "pinia"
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useNotificationsStore } from "@/stores/notifications"

defineProps({
    data: {
        type: Object,
        required: true,
    },
    showApprovals: {
        type: Boolean,
        required: false,
        default: false,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const leaveReqStore = useLeaveRequest()
const notifStore = useNotificationsStore()
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
        notifStore.setSingleNotifAsRead(useRoute().query.notifId)
        navigateTo({
            path: "/hrms/leave",
            query: {
                id: useRoute().query.id,
                type: "View",
                notifId: useRoute().query.notifId,
            },
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
        notifStore.setSingleNotifAsRead(useRoute().query.notifId)
        navigateTo({
            path: "/hrms/leave",
            query: {
                id: useRoute().query.id,
                type: "View",
                notifId: useRoute().query.notifId,
            },
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
            <div v-if="showApprovals" class="flex gap-2 p-2 justify-end relative">
                <button
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                    @click="approvedRequest(data.id)"
                >
                    Approve Request
                </button>
                <button
                    data-popover-target="popover-deny"
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                >
                    Deny Request
                </button>
                <div id="popover-deny" data-popover role="tooltip" class="absolute z-10 invisible inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
                    <div>
                        <div class="text-white text-lg">
                            Overtime Request
                        </div>
                        <div>
                            <div class="w-full">
                                <p class="text-md">
                                    Are you sure you want to deny this process?
                                </p>
                            </div>
                            <div class="py-2 flex-col flex gap-2">
                                <label for="deny-remarks">Your remarks if deny</label>
                                <textarea v-model="remarks" cols="30" rows="10" />
                            </div>
                            <div class="w-full py-2 flex gap-2 justify-end">
                                <button
                                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                                    @click="denyRequest(data.id)"
                                >
                                    Deny Request
                                </button>
                                <button
                                    class="bg-yellow-600 p-2 hover:bg-yellow-900 text-white round-sm"
                                    @click="clearRemarks"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                    <div data-popper-arrow />
                </div>
            </div>
        </template>
    </PsModal>
</template>
