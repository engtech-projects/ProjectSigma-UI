<script setup>
import { storeToRefs } from "pinia"
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"

const voucherStore = useVoucherStore()
const { myDisbursementVouchers } = storeToRefs(voucherStore)

const requestData = ref(null)
const showInformationModal = ref(false)
onMounted(() => {
    if (!myDisbursementVouchers.value.isLoaded) {
        voucherStore.getMyDisbursementVouchers()
    }
})
const showInformation = (data) => {
    requestData.value = data
    showInformationModal.value = true
}
const changePaginate = (newParams) => {
    myDisbursementVouchers.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "DV Number", id: "voucher_no" },
    { name: "Journal Voucher Number", id: "journal_entry.journal_no" },
    { name: "Payee", id: "journal_entry.payment_request.stakeholder.name" },
    { name: "Amount", id: "journal_entry.payment_request.total" },
    { name: "Created At", id: "date_filed" },
    { name: "Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="myDisbursementVouchers.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="myDisbursementVouchers.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="myDisbursementVouchers.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <AccountingVoucherDisbursementInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :voucher-data="requestData"
    />
</template>
