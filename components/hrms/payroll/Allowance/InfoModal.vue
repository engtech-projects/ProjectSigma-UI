<script setup>
import { storeToRefs } from "pinia"
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const resourceStore = useGenerateAllowanceStore()
const { remarks } = storeToRefs(resourceStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await resourceStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: resourceStore.successMessage
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
        await resourceStore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: resourceStore.successMessage
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

const employeeAllowanceHeaders = [
    { name: "Employee", id: "employee" },
    { name: "Employee Position", id: "employee_position" },
    { name: "Allowance Rate", id: "allowance_rate" },
    { name: "Allowance Day(s)", id: "allowance_days" },
    { name: "Allowance Amount", id: "allowance_amount" },
]

</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Allowance Request">
        <template #body>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Charging:
                    </span>
                    <span class="text-gray-900">
                        {{ data.charge_name }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Cutoff Start:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.cutoff_start_human }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Cutoff End:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.cutoff_end_human }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Allowance Date:
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.allowance_date_human }}
                    </span>
                </div>
                <div class="p-2 flex flex-col gap-1">
                    <span class="text-teal-600 text-light">
                        Total # of Day(s):
                    </span>
                    <span class="text-gray-900 text-sm font-bold">
                        {{ data.total_days }}
                    </span>
                </div>
            </div>
            <LayoutPsTable
                :header-columns="employeeAllowanceHeaders"
                :datas="data.employee_allowances ?? []"
            />
            <div class="w-full">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Prepared by: </span> {{ data.requested_by_user }}
                </div>
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
