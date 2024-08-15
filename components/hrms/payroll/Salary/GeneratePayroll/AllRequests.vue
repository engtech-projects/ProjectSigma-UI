<script setup>
import { storeToRefs } from "pinia"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const genPayrollRequestsStpre = useGeneratePayrollStore()
const { allRequests } = storeToRefs(genPayrollRequestsStpre)
if (!allRequests.value.isLoaded) {
    allRequests.value.isLoaded = true
    genPayrollRequestsStpre.getAllRequests()
}

const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
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
    <div class="pb-2 text-gray-500 p-2">
        <LayoutPsTable
            :header-columns="headers"
            :datas="allRequests.list"
            :actions="actions"
            @show-table="showInformation"
        />
    </div>
    <div class="flex justify-center mx-auto">
        <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
    </div>
    <HrmsPayrollSalaryGeneratePayrollInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
