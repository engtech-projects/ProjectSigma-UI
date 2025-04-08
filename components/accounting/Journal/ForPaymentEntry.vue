<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { forPaymentEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

await journalStore.getForPaymentJournalEntries()

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    forPaymentEntries.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Journal No.", id: "journal_no" },
    { name: "Reference No (PRF-no)", id: "payment_request.prf_no" },
    { name: "Payee", id: "payment_request.stakeholder.name" },
    { name: "Amount", id: "total_amount_formatted" },
    { name: "Date Posted", id: "date_filed" },
    { name: "Status", id: "status" },
]

const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="forPaymentEntries.isLoading">
        <div
            v-if="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_FOR_PAYMENT_ENTRIES,
            ])"
            class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2"
        >
            <div class="w-1/3 flex">
                <LayoutFormPsTextInput v-model="forPaymentEntries.params.key" title="Journal No. / PRF No." class="w-full" />
            </div>
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="forPaymentEntries.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="forPaymentEntries.pagination" @change-params="changePaginate" />
            </div>
        </div>
        <div v-else class="w-full py-2">
            RESTRICTED
        </div>
    </LayoutBoards>
    <AccountingJournalInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :entry-data="entryData"
        :type="entryData?.status"
    />
</template>
