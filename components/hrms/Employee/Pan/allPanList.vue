<script setup>
import { storeToRefs } from "pinia"
import { usePersonelActionNotice } from "@/stores/hrms/pan"
const pan = usePersonelActionNotice()
const { allPanList } = storeToRefs(pan)
const snackbar = useSnackbar()
const boardLoading = ref(false)

const employeeData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    employeeData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Requesting Department", id: "requesting_department" },
    { name: "Position/Title", id: "position" },
    { name: "Date Requested", id: "date_requested" },
    { name: "Date Required", id: "date_required" },
    { name: "Employment Type", id: "employment_type" },
    { name: "Nature of Request", id: "nature_of_request" },
    { name: "Requested by", id: "requested_by" },
    { name: "Request Status", id: "request_status" },
]
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await manpowers.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: mains.successMessage
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
const deniedRequest = async (id) => {
    try {
        boardLoading.value = true
        await manpowers.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: mains.successMessage
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
    {{ allPanList }}
    <LayoutBoards title="ALL PERSONEL ACTION NOTICE LIST" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="manpowerList"
                @edit-row="setEdit"
                @delete-row="deleteManpwr"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                    <div class="flex gap-2 justify-between p-2">
                        <p>Application Information</p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-4xl">POSITION {{ employeeData.position }}</span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        sample
                    </div>
                    <div class="flex gap-2 p-2 justify-end">
                        <button
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                            @click="approvedRequest(employeeData.id)"
                        >
                            Approved Request
                        </button>
                        <button
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                            @click="deniedRequest(employeeData.id)"
                        >
                            Denied Request
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>
