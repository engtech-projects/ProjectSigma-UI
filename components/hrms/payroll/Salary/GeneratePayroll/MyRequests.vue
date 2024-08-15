<script setup>
import { storeToRefs } from "pinia"
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"

const genPayrollRequestsStpre = useGeneratePayrollStore()
const { myRequests } = storeToRefs(genPayrollRequestsStpre)
if (!myRequests.value.isLoaded) {
    myRequests.value.isLoaded = true
    genPayrollRequestsStpre.getMyRequests()
}

const headers = [
    { name: "Payroll Date", id: "payroll_date" },
    { name: "Charged to", id: "charging_name" },
    { name: "Cut Off End", id: "cutoff_end" },
    { name: "Cut Off Start", id: "cutoff_start" },
    { name: "Payroll Type", id: "payroll_type" },
    { name: "Release Type", id: "release_type" },
    { name: "Request Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
const changePaginate = (newParams) => {
    myRequests.value.params.page = newParams.page ?? ""
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
            :datas="myRequests.list ?? []"
            @show-table="showInformation"
        />
    </div>
    <div class="flex justify-center mx-auto">
        <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
    </div>
    <HrmsPayrollSalaryGeneratePayrollInfoModal
        v-model:show-modal="showInfoModal"
        :data="infoModalData"
    />
</template>
