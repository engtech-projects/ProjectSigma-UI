<script setup>
import { storeToRefs } from "pinia"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
const { myApprovals } = storeToRefs(paymentRequestStore)

const requestData = ref(null)
const showInformationModal = ref(false)
const showInformation = (data) => {
    requestData.value = data
    showInformationModal.value = true
}
const changePaginate = (newParams) => {
    myApprovals.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "PRF Number", id: "prf_no" },
    { name: "Payee", id: "stakeholder.name" },
    { name: "Amount", id: "total_amount_formatted" },
    { name: "Created At", id: "date_filed" },
    { name: "Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="myApprovals.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER_MY_APPROVAL,
            ])"
        >
            <div class="w-1/3 flex">
                <LayoutFormPsTextInput v-model="myApprovals.params.key" title="PRF Number" class="w-full" />
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="myApprovals.list ?? []"
                    @show-table="showInformation"
                />
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="myApprovals.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
    <AccountingRequestNonPurchaseRequestInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :payment-data="requestData"
    />
</template>
