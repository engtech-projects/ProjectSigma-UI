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
    { name: "Allowance Rate", id: "allowance_rate_formatted" },
    { name: "Allowance Day(s)", id: "allowance_days" },
    { name: "Allowance Amount", id: "allowance_amount_formatted" },
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
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </template>
    </PsModal>
</template>
