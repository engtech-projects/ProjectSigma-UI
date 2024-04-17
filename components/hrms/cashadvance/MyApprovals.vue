<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { myApprovalRequestList: cashadvanceList, remarks } = storeToRefs(cashadvances)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const cashadvanceData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    cashadvanceData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Employee Name", id: "employee_id" },
    { name: "Designation", id: "designation" },
    { name: "Department", id: "department_id" },
    { name: "Project", id: "project_id" },
    { name: "Amount Requested", id: "amount_requested" },
    { name: "Amount Approved", id: "amount_approved" },
    { name: "Terms", id: "terms_of_cash_advance" },
    { name: "Remarks", id: "remarks" },
    { name: "Released by", id: "released_by" },
]
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await cashadvances.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
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
        await cashadvances.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
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
                :datas="cashadvanceList ?? []"
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
                            <span class="text-gray-900 text-4xl">Employee Name {{ cashadvanceData.employee_id }}</span>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Designation: </span> <span class="text-gray-900">{{ cashadvanceData.designation }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Department: </span> {{ cashadvanceData.department_id }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Project: </span> {{ cashadvanceData.project_id }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Amount Requested: </span> {{ cashadvanceData.amount_requested }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Amount Approved: </span> {{ cashadvanceData.amount_approved }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Terms: </span> {{ cashadvanceData.terms_of_cash_advance }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Remarks: </span> {{ cashadvanceData.remarks }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light"> Released by: </span> {{ cashadvanceData.released_by }}
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="cashadvanceData.approvals" />
                    </div>
                    <div class="flex gap-2 p-2 justify-end">
                        <button
                            class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                            @click="approvedRequest(cashadvanceData.id)"
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
                                        @click="denyRequest(cashadvanceData.id)"
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
