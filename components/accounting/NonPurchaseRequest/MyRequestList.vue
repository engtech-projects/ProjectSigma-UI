<script setup>
import { storeToRefs } from "pinia"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
const { myRequests } = storeToRefs(paymentRequestStore)

const requestData = ref(null)
const showInformationModal = ref(false)
onMounted(() => {
    if (!myRequests.value.isLoaded) {
        paymentRequestStore.getMyRequests()
    }
})
const showInformation = (data) => {
    requestData.value = data
    showInformationModal.value = true
}
const changePaginate = (newParams) => {
    myRequests.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "PRF Number", id: "prf_no" },
    { name: "Payee", id: "stakeholder.name" },
    { name: "Amount", id: "total" },
    { name: "Created At", id: "created_at" },
    { name: "Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="myRequests.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myRequests.list"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="myRequests.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <AccountingNonPurchaseRequestInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :payment-data="requestData"
    />
</template>
