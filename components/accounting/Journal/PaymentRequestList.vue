<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { paymentRequestEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

await journalStore.getPaymentRequestEntries()

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const changePaginate = (newParams) => {
    paymentRequestEntries.value.params.page = newParams.page ?? ""
}

const headers = [
    { name: "PRF Number", id: "prf_no" },
    { name: "Payee", id: "stakeholder.name" },
    { name: "Amount", id: "total_amount_formatted" },
    { name: "PRF Date Created", id: "date_filed" },
    { name: "Status", id: "request_status" },
]

const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="paymentRequestEntries.isLoading">
        <div class="w-1/3 flex">
            <LayoutFormPsTextInput v-model="paymentRequestEntries.params.key" title="PRF No." class="w-full" />
        </div>
        <div class="pb-2 text-gray-500 text-[12px] overflow-y-auto p-2">
            <LayoutPsTable
                :header-columns="headers"
                :actions="actions"
                :datas="paymentRequestEntries.list ?? []"
                @show-table="showInformation"
            />
            <div class="flex justify-center mx-auto">
                <CustomPagination :links="paymentRequestEntries.pagination" @change-params="changePaginate" />
            </div>
        </div>
    </LayoutBoards>
    <AccountingJournalInfoModalPaymentRequestEntries
        v-model:showModal="showInformationModal"
        :fillable="false"
        :payment-data-entries="entryData"
    />
</template>
