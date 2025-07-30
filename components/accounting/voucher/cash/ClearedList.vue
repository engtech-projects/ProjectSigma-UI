<script setup>
import { storeToRefs } from "pinia"
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"

const voucherStore = useVoucherStore()
const { cashClearedVoucher } = storeToRefs(voucherStore)

const requestData = ref(null)
const showInformationModal = ref(false)
const showInformation = (data) => {
    requestData.value = data
    showInformationModal.value = true
}
const changePaginate = (newParams) => {
    cashClearedVoucher.value.params.page = newParams.page ?? ""
}
const headers = [
    { name: "CV Number", id: "voucher_no" },
    { name: "Journal Voucher Number", id: "journal_entry.journal_no" },
    { name: "Payee", id: "journal_entry.payment_request.stakeholder.name" },
    { name: "Amount", id: "journal_entry.total_amount_formatted" },
    { name: "Created At", id: "date_filed" },
    { name: "Status", id: "request_status" },
]
const actions = {
    showTable: true,
}
</script>
<template>
    <LayoutBoards class="w-full" :loading="cashClearedVoucher.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_CLEARED,
            ])"
        >
            <div class="w-1/3 flex">
                <LayoutFormPsTextInput v-model="cashClearedVoucher.params.key" title="CV Number/Journal Voucher Number" class="w-full" />
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="cashClearedVoucher.list ?? []"
                    @show-table="showInformation"
                />
                <div class="flex justify-center mx-auto">
                    <PsCustomPagination :links="cashClearedVoucher.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
    <AccountingVoucherCashInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :voucher-data="requestData"
    />
</template>
