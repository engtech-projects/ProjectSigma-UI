<script setup lang="ts">
import { useSalaryDisbursementStore } from "@/stores/hrms/payroll/salaryDisbursement"

const salaryDisbursementStore = useSalaryDisbursementStore()
const { payslipReadyRecords } = storeToRefs(salaryDisbursementStore)
onMounted(() => {
    if (!payslipReadyRecords.value.isLoaded) {
        payslipReadyRecords.value.isLoaded = true
        salaryDisbursementStore.getPayslipReadyRecords()
    }
})
const changePaginate = (newParams: any) => {
    payslipReadyRecords.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "Payroll Date", id: "payroll_date_human" },
    { name: "Payroll Type", id: "payroll_type" },
    { name: "Release Type", id: "release_type" },
    { name: "Requested By", id: "created_by_user_name" },
    { name: "Request Status", id: "request_status" },
    { name: "Disbursement Status", id: "disbursement_status" },
]
const actions = {
    showTable: true,
}
const showInformation = (data: any) => {
    navigateTo({
        path: "/hrms/payroll/release-payslip",
        query: {
            id: data.id,
        }
    })
}
</script>
<template>
    <div class="pb-2 text-gray-500 p-2">
        <LayoutLoadingContainer :loading="payslipReadyRecords.isLoading">
            <LayoutPsTable
                :header-columns="headers"
                :datas="payslipReadyRecords.list"
                :actions="actions"
                @show-table="showInformation"
            />
        </LayoutLoadingContainer>
    </div>
    <div class="flex justify-center mx-auto">
        <CustomPagination :links="payslipReadyRecords.pagination" @change-params="changePaginate" />
    </div>
</template>
