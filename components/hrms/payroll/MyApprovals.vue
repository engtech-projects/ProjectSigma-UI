<script setup>
import { storeToRefs } from "pinia"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const genpayrollstore = useGeneratePayrollStore()

const { myApprovalRequestList: generatePayrollList, remarks } = storeToRefs(genpayrollstore)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const generatePayrollData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    generatePayrollData.value = data
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const headers = [
    { name: "Charge Department", id: "charge_assignment.department_name" },
    { name: "Cutoff Start", id: "cutoff_start" },
    { name: "Cutoff End", id: "cutoff_end" },
    { name: "Allowance Date", id: "allowance_date" },
    { name: "Allowance Amount", id: "allowance_amount" },
    { name: "Total # of Day(s)", id: "total_days" },
    { name: "Total Amount", id: "total_amount" },
]
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await genallowstore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: genallowstore.successMessage
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
        await genallowstore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: genallowstore.successMessage
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
                :datas="generatePayrollList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <LayoutBoards title="" class="bg-white p-4 w-8/12 h-2/3 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute" :loading="boardLoading">
                    <div class="flex gap-2 justify-between p-2">
                        <p class="text-lg font-medium">
                            Request Information
                        </p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" class="w-5 h-5 rounded-sm hover:text-white hover:bg-red-400" />
                        </button>
                    </div>
                    <!-- <div class="grid gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-gray-900 text-4xl">Project {{ generatePayrollData.project_id }}</span>
                        </div>
                    </div> -->
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium "> Requesting Office: </span> <span class="text-gray-900">{{ generatePayrollData.charge_assignment.department_name }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Cutoff Start: </span> {{ generatePayrollData.cutoff_start }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Cutoff End: </span> {{ generatePayrollData.cutoff_end }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Allowance Date: </span> {{ generatePayrollData.allowance_date }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Allowance Amount: </span> {{ generatePayrollData.allowance_amount }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Total # of Day(s): </span> {{ generatePayrollData.total_days }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 font-medium">Total Amount: </span> {{ generatePayrollData.total_amount }}
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="generatePayrollData.approvals" />
                    </div>
                    <div class="flex gap-2 p-2 justify-end mt-10">
                        <button
                            class="rounded-lg bg-green-500 p-2 hover:bg-green-400 text-white round-sm"
                            @click="approvedRequest(generatePayrollData.id)"
                        >
                            Approve Request
                        </button>
                        <button
                            data-popover-target="popover-deny-travelorder-request"
                            class="rounded-lg bg-red-500 p-2 hover:bg-red-400 text-white round-sm"
                        >
                            Deny Request
                        </button>
                    </div>
                    <div id="popover-deny-travelorder-request" data-popover role="tooltip" class="absolute z-40 rounded-lg invisible inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
                        <div>
                            <div class="text-white text-lg">
                                Generate Allowance Request
                            </div>
                            <div>
                                <div class="w-full">
                                    <p class="text-md text-slate-400">
                                        Are you sure you want to deny this process?
                                    </p>
                                </div>
                                <div class="py-2 flex-col flex gap-2 text-slate-400">
                                    <label for="deny-remarks">Your remarks if deny</label>
                                    <textarea v-model="remarks" cols="4" rows="4" />
                                </div>
                                <div class="w-full py-2 flex gap-2 justify-end">
                                    <button
                                        class="rounded-lg bg-red-500 p-2 hover:bg-red-400 text-white round-sm"
                                        @click="denyRequest(generatePayrollData.id)"
                                    >
                                        Deny Request
                                    </button>
                                    <button
                                        class="rounded-lg bg-yellow-600 p-2 hover:bg-yellow-900 text-white round-sm"
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
