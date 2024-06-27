<script setup>
import { storeToRefs } from "pinia"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const genpayrollstore = useGeneratePayrollStore()
const { myApprovalRequestList } = storeToRefs(genpayrollstore)

const headers = [
    { name: "Payroll Date", id: "payroll_date" },
    { name: "Cut Off Start", id: "cutoff_start" },
    { name: "Cut Off End", id: "cutoff_end" },
    { name: "Payroll Type", id: "payroll_type" },
    { name: "Release Type", id: "release_type" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data) => {
    infoModalData.value = data
    showInfoModal.value = true
}

const boardLoading = ref(false)
</script>

<template>
    <LayoutBoards title="My Approval List" class="w-full" :loading="boardLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myApprovalRequestList ?? []"
                @show-table="showInformation"
            />
        </div>
    </LayoutBoards>
    <HrmsPayrollInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
        :show-approvals="true"
    />
</template>
