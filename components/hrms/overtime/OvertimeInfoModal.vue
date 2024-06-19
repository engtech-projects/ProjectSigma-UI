<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

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

const overtimes = useOvertimeStore()
const { remarks } = storeToRefs(overtimes)

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
        await overtimes.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
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

const headers = [
    { name: "Employee Name", id: "fullname_first" },
]

</script>

<template>
    <Teleport to="body">
        <div v-if="showModal">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <LayoutBoards title="" class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute" :loading="boardLoading">
                    <div class="flex gap-2 justify-between p-2">
                        <p class="text-base">
                            Overtime
                        </p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4 " />
                            Close
                        </button>
                    </div>
                    <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-4xl">Overtime</span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Charged to: </span> <span class="text-gray-900">{{ data.charging_name }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Date of Overtime: </span> {{ data.overtime_date }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> From: </span> {{ data.start_time_human }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> To: </span> {{ data.end_time_human }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Purpose/Reason: </span> {{ data.reason }}
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Employees: </span>
                        </div>
                        <LayoutPsTable
                            :header-columns="headers"
                            :datas="data.employees"
                            :actions="actions"
                        />
                    </div>
                    <div class="w-full">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Prepared by: </span> {{ data.prepared_by.name }}
                        </div>
                        <LayoutApprovalsListView :approvals="data.approvals" />
                    </div>
                    <div v-if="showApprovals" class="flex gap-2 p-2 justify-end">
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
                    </div>
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
                </LayoutBoards>
            </div>
        </div>
    </Teleport>
</template>
