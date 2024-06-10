<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()

const { approvalPanList, remarks } = storeToRefs(pan)
const approvalLoading = ref(false)

const panData = ref(null)
const showInformationModal = ref(false)
const snackbar = useSnackbar()

const showInformation = (data) => {
    panData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}
const denydRequest = async (id) => {
    try {
        approvalLoading.value = true
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
        approvalLoading.value = false
    }
    clearRemarks()
}

const clearRemarks = () => {
    remarks.value = ""
}

const approvedRequest = async (id) => {
    try {
        approvalLoading.value = true
        await pan.approvedPanRequest(id)
        snackbar.add({
            type: "success",
            text: pan.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        approvalLoading.value = false
    }
}
const headers = [
    { name: "REQUEST TYPE", id: "type" },
    { name: "DATE REQUESTED", id: "request_created_at" },
    { name: "DATE EFFECTIVITY", id: "date_of_effictivity" },
    { name: "REQUEST STATUS", id: "request_status" },
]

const actions = {
    showTable: true,
}

</script>

<template>
    <LayoutBoards title="MY APPROVALS" class="w-full">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="approvalPanList"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <LayoutBoards title="" class="bg-white p-4 w-8/12 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute" :loading="approvalLoading">
                    <div class="flex gap-2 justify-between p-2">
                        <p>Personel Action Notice (<span class="text-blue-500">{{ panData.type }}</span>)</p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="p-2">
                        <HrmsEmployeePanPersonalActionFormInfo :pan-data="panData" />
                    </div>
                    <div class="flex gap-2 p-2 justify-end">
                        <button
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                            @click.once="approvedRequest(panData.id)"
                        >
                            Approve Request
                        </button>
                        <button
                            data-popover-target="popover-deny-pan-request"
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                        >
                            Deny Request
                        </button>
                    </div>
                    <div class="flex gap-2 justify-end p-2">
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                </LayoutBoards>
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
                                    @click="denydRequest(panData.id)"
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
        </Teleport>
    </div>
</template>
