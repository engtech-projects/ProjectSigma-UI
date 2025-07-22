<script setup>
import { storeToRefs } from "pinia"
import { usePayrollRequestStore } from "@/stores/accounting/requests/payrollrequest"

const payrollRequestStore = usePayrollRequestStore()
const { payrollAllRequestList: allRequests } = storeToRefs(payrollRequestStore)

const requestData = ref(null)
const showInformationModal = ref(false)
const showInformation = (data) => {
    requestData.value = data
    showInformationModal.value = true
}
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "Payroll number", id: "prf_no" },
    { name: "Payee", id: "stakeholder.name" },
    { name: "Amount", id: "total_amount_formatted" },
    { name: "Date filed", id: "date_filed" },
    { name: "Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>
<template>
    <div class="w-1/3 flex">
        <LayoutFormPsTextInput v-model="allRequests.params.key" title="Payroll No. / Payee" class="w-full" />
    </div>
    <LayoutBoards class="w-full" :loading="allRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="allRequests.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <PsCustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <AccountingRequestPayrollRequestInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :payment-data="requestData"
    />
</template>
