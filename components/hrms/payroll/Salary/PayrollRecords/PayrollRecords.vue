<script setup lang="ts">
import { usePayrollStore } from "@/stores/hrms/payroll/payroll"

const payrollStore = usePayrollStore()
const { allRecords } = storeToRefs(payrollStore)
const headers = [
    { name: "Payroll Date", style: "", id: "payroll_date_human" },
    { name: "Charged to", style: "", id: "charging_name" },
    { name: "Cut Off Start", style: "", id: "cutoff_start_human" },
    { name: "Cut Off End", style: "", id: "cutoff_end_human" },
    { name: "Payroll Type", style: "", id: "payroll_type" },
    { name: "Release Type", style: "", id: "release_type" },
]

const actions = {
    showTable: true,
}
const infoModalData = ref({})
const showInfoModal = ref(false)
const showInformation = (data: any) => {
    infoModalData.value = data
    showInfoModal.value = true
}
</script>
<template>
    <LayoutLoadingContainer :loading="allRecords.isLoading">
        <HrmsPayrollSalaryPayrollRecordsPayrollFilters />
        <LayoutLoadingContainer :loading="false">
            <LayoutPsTable
                :header-columns="headers"
                :datas="allRecords.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </LayoutLoadingContainer>
        <HrmsPayrollSalaryGeneratePayrollInfoModal
            v-model:show-modal="showInfoModal"
            :data="infoModalData"
        />
    </LayoutLoadingContainer>
</template>
