<script setup>
import { storeToRefs } from "pinia"
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()
const { myApprovalRequestList: travelList, remarks } = storeToRefs(travels)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const travelData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    travelData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Requested by", id: "requested_by" },
    { name: "Requesting Office", id: "requesting_office" },
    { name: "Destination", id: "destination" },
    { name: "Purpose", id: "purpose_of_travel" },
    { name: "Duration", id: "duration_of_travel" },
    { name: "Remarks", id: "remarks" },
]
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await travels.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: travels.successMessage
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
const clearRemarks = () => {
    remarks.value = ""
}
const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await travels.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: travels.successMessage
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

const actions = {
    showTable: true,
}

</script>

<template>
    <LayoutBoards title="My Approval List" class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="travelList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <LayoutBoards title="" class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute" :loading="boardLoading">
                    <div class="flex gap-2 justify-between p-2">
                        <p>Request Information</p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-4xl">REQUEST {{ travelData.destination }}</span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Requesting Office: </span> <span class="text-gray-900">{{ travelData.requesting_office }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Purpose of Travel: </span> {{ travelData.purpose_of_travel }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Duration of Travel (days): </span> {{ travelData.duration_of_travel }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Remarks: </span> {{ travelData.remarks }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Requested By: </span> {{ travelData.requested_by }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Request Status: </span> {{ travelData.requested_by }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> remarks </span> {{ travelData.remarks }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> request_status </span> {{ travelData.request_status }}
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="travelData.approvals" />
                    </div>
                    <div class="flex gap-2 p-2 justify-end">
                        <button
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                            @click="approvedRequest(travelData.id)"
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
                                        @click="denyRequest(travelData.id)"
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
                </LayoutBoards>
            </div>
        </Teleport>
    </div>
</template>
