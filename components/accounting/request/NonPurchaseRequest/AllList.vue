<script setup>
import { storeToRefs } from "pinia"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
const { allRequests } = storeToRefs(paymentRequestStore)

const requestData = ref(null)
const showInformationModal = ref(false)
await paymentRequestStore.getAllRequests()
const showInformation = (data) => {
    requestData.value = data
    showInformationModal.value = true
}
const changePaginate = (newParams) => {
    allRequests.value.params.page = newParams.page ?? ""
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
const ddata = computed(() => {
    const result = []
    allRequests.value.list.forEach((item) => {
        item.approvals.forEach((approval) => {
            approval.status = "Approved"
        })
        result.push(item)
    })
    return result
})
</script>
<template>
    <LayoutBoards class="w-full" :loading="allRequests.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER_ALL,
            ])"
        >
            <div class="w-1/3 flex">
                <LayoutFormPsTextInput v-model="allRequests.params.key" title="PRF Number / Payee" class="w-full" />
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="ddata ?? []"
                    @show-table="showInformation"
                />
                <div class="flex justify-center mx-auto">
                    <CustomPagination :links="allRequests.pagination" @change-params="changePaginate" />
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
