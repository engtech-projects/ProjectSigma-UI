<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { unpostedEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

await journalStore.getUnpostedEntries()

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    unpostedEntries.value.params.page = newParams.page ?? ""
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
    <LayoutBoards class="w-full" :loading="unpostedEntries.isLoading">
        <div class="w-1/3 flex">
            <LayoutFormPsTextInput v-model="unpostedEntries.params.key" title="Journal No. / PRF No." class="w-full" />
        </div>
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="unpostedEntries.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="unpostedEntries.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <AccountingJournalInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :entry-data="entryData"
        :type="entryData?.status"
    />
</template>
