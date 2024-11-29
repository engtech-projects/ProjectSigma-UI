<script setup>
import { storeToRefs } from "pinia"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { paymentRequestEntries } = storeToRefs(journalStore)

const entryData = ref(null)
const showInformationModal = ref(false)

onMounted(() => {
    if (!paymentRequestEntries.value.isLoaded) {
        journalStore.getPaymentRequestEntries()
    }
})

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
    { name: "Amount", id: "total" },
    { name: "Created At", id: "created_at" },
    { name: "Status", id: "request_status" },
]

const actions = {
    showTable: true,
}
</script>

<template>
    <LayoutBoards class="w-full" :loading="paymentRequestEntries.isLoading">
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
