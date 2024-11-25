<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { unpostedEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

onMounted(() => {
    if (!unpostedEntries.value.isLoaded) {
        journalStore.getUnpostedEntries()
    }
})

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    unpostedEntries.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Journal No.", id: "journal_no" },
    { name: "Description", id: "description" },
    { name: "Total Amount", id: "total_amount" },
    { name: "Created At", id: "created_at" },
    { name: "Status", id: "status" },
]

const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="unpostedEntries.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="unpostedEntries.list"
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
    />
</template>
