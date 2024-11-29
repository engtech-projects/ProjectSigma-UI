<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { draftedEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

onMounted(() => {
    if (!draftedEntries.value.isLoaded) {
        journalStore.getDraftedEntries()
    }
})

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    draftedEntries.value.params.page = newParams.page ?? ""
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
    <LayoutBoards class="w-full" :loading="draftedEntries.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="draftedEntries.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="draftedEntries.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <AccountingJournalInfoModal
        v-model:showModal="showInformationModal"
        :fillable="false"
        :entry-data="entryData"
    />
</template>
