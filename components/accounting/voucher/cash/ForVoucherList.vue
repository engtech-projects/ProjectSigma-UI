<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { forCashVoucherEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

onMounted(() => {
    if (!forCashVoucherEntries.value.isLoaded) {
        journalStore.getForCashVoucherEntries()
    }
})

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    forCashVoucherEntries.value.params.page = newParams.page ?? ""
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
    <LayoutBoards class="w-full" :loading="forCashVoucherEntries.isLoading">
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
    </LayoutBoards>
    <AccountingVoucherCashInfoModalJournalVoucherEntry
        v-model:showModal="showInformationModal"
        :fillable="false"
        :entry-data="entryData"
    />
</template>
