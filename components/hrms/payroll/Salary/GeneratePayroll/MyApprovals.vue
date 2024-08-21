<script setup>
import { storeToRefs } from "pinia"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const genPayrollRequestsStpre = useGeneratePayrollStore()
const { myApprovals } = storeToRefs(genPayrollRequestsStpre)
if (!myApprovals.value.isLoaded) {
    myApprovals.value.isLoaded = true
    genPayrollRequestsStpre.getMyApprovals()
}

const headers = [
    { name: "Payroll Date", id: "payroll_date_human" },
    { name: "Charged to", id: "charging_name" },
    { name: "Cut Off Start", id: "cutoff_start_human" },
    { name: "Cut Off End", id: "cutoff_end_human" },
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

</script>

<template>
    <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
        <LayoutPsTable
            :header-columns="headers"
            :actions="actions"
            :datas="myApprovals.list ?? []"
            @show-table="showInformation"
        />
    </div>
    <HrmsPayrollSalaryGeneratePayrollInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
