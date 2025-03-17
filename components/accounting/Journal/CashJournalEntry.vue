<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { cashEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

await journalStore.getCashJournalEntries()

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    cashEntries.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Journal No.", id: "journal_no" },
    { name: "Reference No (PRF-no)", id: "payment_request.prf_no" },
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
    <LayoutBoards class="w-full" :loading="cashEntries.isLoading">
        <div
            v-if="useCheckAccessibility([
                AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_CASH_ENTRIES,
            ])"
            class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2"
        >
            <div class="w-1/3 flex">
                <LayoutFormPsTextInput v-model="cashEntries.params.key" title="Journal No. / PRF No." class="w-full" />
            </div>
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="cashEntries.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="cashEntries.pagination" @change-params="changePaginate" />
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
