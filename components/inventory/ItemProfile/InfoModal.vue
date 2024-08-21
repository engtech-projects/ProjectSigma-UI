<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const travelOrderStore = useTravelorderStore()
const { remarks } = storeToRefs(travelOrderStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await travelOrderStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: travelOrderStore.successMessage
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
        await travelOrderStore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: travelOrderStore.successMessage
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
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="TRAVEL ORDER">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">TRAVEL REQUEST TO: {{ data.destination }}</span>
                </div>
            </div>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-xl">Requesting Office: <span class="text-teal-600 font-medium">{{ data.department.name }}</span></span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 divide-x gap-2 md:justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 font-medium ">Employee(s): </span> <span class="text-gray-900">{{ data.employees.map(employee => employee.name).join(', ') }}</span>
                </div>
                <div class="p-2 flex flex-col gap-2">
                    <span class="text-teal-600 font-medium">Destination: </span> {{ data.destination }}
                    <span class="text-teal-600 font-medium">Purpose of Travel: </span> {{ data.purpose_of_travel }}
                    <span class="text-teal-600 font-medium">Date of Travel: </span> {{ data.date_of_travel_human }}
                    <span class="text-teal-600 font-medium">Time of Travel: </span> {{ data.time_of_travel_human }}
                    <span class="text-teal-600 font-medium">Duration of Travel (days): </span> {{ data.duration_of_travel }}
                    <span class="text-teal-600 font-medium">Means of Transportation
                        : </span> {{ data.means_of_transportation }}
                </div>
                <div class="p-2 flex flex-col gap-2">
                    <span class="text-teal-600 font-medium">Remarks
                        : </span> {{ data.remarks }}
                    <span class="text-teal-600 font-medium">Request Status: </span> {{ data.request_status }}
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end relative">
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
                            Travel Order Request
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
