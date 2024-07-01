<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const cashadvances = useCashadvanceStore()
const { data: userData } = useAuth()

const showModal = defineModel("showModal", { required: false, type: Boolean })
const { remarks } = storeToRefs(cashadvances)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await cashadvances.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
        showInformationModal.value = false
    }
}

const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await cashadvances.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
        showInformationModal.value = false
    }
}
</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">{{ data.employee.fullname_last }}</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Designation:
                    </span>
                    <span class="text-gray-900">
                        {{ data.designation }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Department:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.department? data.department.department_name : "" }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Project:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ !data.project? "N/A" : data.project.project_code }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Amount Requested:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.amount }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Amount Approved:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.total_paid }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Terms:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.terms_of_payment }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Remarks:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.remarks }}
                    </span>
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end">
                <button
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                    @click="approvedRequest(data.id)"
                >
                    Approve Request
                </button>
                <button
                    data-popover-target="popover-deny-travelorder-request"
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                >
                    Deny Request
                </button>
            </div>
            <div id="popover-deny-travelorder-request" data-popover role="tooltip" class="absolute z-10 invisible inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
                <div>
                    <div class="text-white text-lg">
                        Cash Advance List
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
        </template>
    </PsModal>
</template>
