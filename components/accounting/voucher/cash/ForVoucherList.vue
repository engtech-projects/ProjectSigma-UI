<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { forCashVoucherEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

await journalStore.getForCashVoucherEntries()
const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    forCashVoucherEntries.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Disbursement Voucher No", id: "reference_no" },
    { name: "Journal No.", id: "journal_no" },
    { name: "Payee", id: "payment_request.stakeholder.name" },
    { name: "Amount", id: "total_amount_formatted" },
    { name: "Date Posted", id: "date_filed" },
    { name: "Status", id: "voucher_status" },
]

const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="forCashVoucherEntries.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_FOR_CASH_VOUCHER,
            ])"
        >
            <div class="w-1/3 flex">
                <LayoutFormPsTextInput v-model="forCashVoucherEntries.params.key" title="CV Number/Journal Voucher Number" class="w-full" />
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="forCashVoucherEntries.list ?? []"
                    @show-table="showInformation"
                />
                <div class="flex justify-center mx-auto">
                    <CustomPagination :links="forCashVoucherEntries.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
    <AccountingVoucherCashInfoModalJournalVoucherEntry
        v-model:showModal="showInformationModal"
        :fillable="false"
        :entry-data="entryData"
    />
</template>
