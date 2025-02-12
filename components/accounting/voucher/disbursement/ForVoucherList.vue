<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { forDisbursementVoucherEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

await journalStore.getForDisbursementVoucherEntries()
const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    forDisbursementVoucherEntries.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Journal No.", id: "journal_no" },
    { name: "Reference No (PRF-no)", id: "reference_no" },
    { name: "Payee", id: "payment_request.stakeholder.name" },
    { name: "Amount", id: "payment_request.total" },
    { name: "Date Posted", id: "date_filed" },
    { name: "Status", id: "status" },
]

const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="forDisbursementVoucherEntries.isLoading">
        <LayoutAcessContainer
            :if-access="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_FOR_DISBURSEMENT_VOUCHER,
            ])"
        >
            <div class="w-1/3 flex">
                <LayoutFormPsTextInput v-model="forDisbursementVoucherEntries.params.key" title="DV Number/Journal Voucher Number" class="w-full" />
            </div>
            <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
                <LayoutPsTable
                    :header-columns="headers"
                    :actions="actions"
                    :datas="forDisbursementVoucherEntries.list ?? []"
                    @show-table="showInformation"
                />
                <div class="flex justify-center mx-auto">
                    <CustomPagination :links="forDisbursementVoucherEntries.pagination" @change-params="changePaginate" />
                </div>
            </div>
        </LayoutAcessContainer>
    </LayoutBoards>
    <AccountingVoucherDisbursementInfoModalJournalVoucherEntry
        v-model:showModal="showInformationModal"
        :fillable="false"
        :entry-data="entryData"
        :type="entryData?.status"
    />
</template>
