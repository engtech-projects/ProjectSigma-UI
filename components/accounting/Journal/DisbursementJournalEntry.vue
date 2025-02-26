<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { disbursementEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

await journalStore.getDisbursementJournalEntries()

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    disbursementEntries.value.params.page = newParams.page ?? ""
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
    <LayoutBoards class="w-full" :loading="disbursementEntries.isLoading">
        <div
            v-if="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_DISBURSEMENT_ENTRIES,
            ])"
            class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2"
        >
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="disbursementEntries.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="disbursementEntries.pagination" @change-params="changePaginate" />
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
