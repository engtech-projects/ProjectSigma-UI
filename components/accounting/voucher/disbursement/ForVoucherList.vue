<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { forVoucherEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

onMounted(() => {
    if (!forVoucherEntries.value.isLoaded) {
        journalStore.getForVoucherEntries()
    }
})

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    forVoucherEntries.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "Journal No.", id: "journal_no" },
    { name: "Reference No.", id: "reference_no" },
    { name: "Payee", id: "payment_request.stakeholder.name" },
    { name: "Amount", id: "payment_request.total" },
    { name: "Date Posted", id: "date_filed" },
    { name: "Status", id: "voucher_status" },
]

const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="forVoucherEntries.isLoading">
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="forVoucherEntries.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="forVoucherEntries.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <AccountingVoucherDisbursementInfoModalJournalVoucherEntry
        v-model:showModal="showInformationModal"
        :fillable="false"
        :entry-data="entryData"
    />
</template>
