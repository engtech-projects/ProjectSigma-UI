<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const pan = usePersonelActionNotice()
const { remarks } = storeToRefs(pan)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await pan.denyRequest(id)
        snackbar.add({
            type: "success",
            text: pan.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
    clearRemarks()
}

const clearRemarks = () => {
    remarks.value = ""
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await pan.approvedPanRequest(id)
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

</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" :title="'Personal Action Notice for ' + data.type">
        <template #body>
            <div class="p-2">
                <HrmsEmployeePanPersonalActionFormInfo :pan-data="data" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end">
                <button
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                    @click.once="approvedRequest(data.id)"
                >
                    Approve Request
                </button>
                <button
                    data-popover-target="popover-deny-pan-request"
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                >
                    Deny Request
                </button>
                <div id="popover-deny-pan-request" data-popover role="tooltip" class="absolute z-10 invisible inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
                    <div>
                        <div class="text-white text-lg">
                            Personal Action Notice Message Confirmation
                        </div>
                        <div>
                            <div class="w-full">
                                <p class="text-md">
                                    Are you sure you want to deny this process?
                                </p>
                            </div>
                            <div class="py-2 flex-col flex gap-2">
                                <label for="deny-remarks">Your Remarks if deny</label>
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
                                    class="bg-yellow-400 p-2 hover:bg-yellow-900 text-white round-sm"
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
