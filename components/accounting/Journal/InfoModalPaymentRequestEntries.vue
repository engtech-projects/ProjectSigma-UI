<script setup>
import { useJournalStore } from "@/stores/accounting/journals/journal"
const { journal } = storeToRefs(useJournalStore())
const journalStore = useJournalStore()
defineProps({
    paymentDataEntries: {
        type: Object,
        required: false,
        default: null
    },
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})
const generateJournal = async (data) => {
    await journalStore.generateJournalNumber()
    journal.value.details = data.details.map(detail => ({
        debit: detail.debit,
        credit: detail.credit,
        vat: parseInt(detail.vat ?? 0),
        stakeholder_id: detail.stakeholder_id,
        stakeholder_type: trimStakeholdableType(detail?.stakeholder?.stakeholdable_type),
        stakeholderInformation: detail.stakeholder,
        journalAccountInfo: detail?.journalAccountInfo,
        description: detail.particulars
    }))

    journal.value.stakeholder_id = data?.stakeholder_id
    journal.value.journal_date = data.date_filed
    journal.value.reference_no = data.prf_no
    journal.value.payment_request_id = data.id
    journal.value.description = data.description
    journal.value.remarks = data.description
    journal.value.total = parseFloat(data.total) + parseFloat(data.total_vat_amount)
    showModal.value = false
}
const trimStakeholdableType = (type) => {
    if (type) {
        return type.replace("App\\Models\\Stakeholders\\", "").toLowerCase()
    }
    return null
}
const showModal = defineModel("showModal", { required: false, type: Boolean })
const boardLoading = ref(false)
</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">Payment Request (For Journal Entries)</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">PRF Number: </span>
                    <span class="text-gray-900">{{ paymentDataEntries?.prf_no }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Payee: </span>
                    {{ paymentDataEntries?.stakeholder?.name }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Amount: </span>
                    {{ paymentDataEntries?.total }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Status: </span>
                    {{ paymentDataEntries?.request_status }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Prepared by: </span>
                    {{ paymentDataEntries?.created_by_user }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Prepared on: </span>
                    {{ paymentDataEntries?.date_filed }}
                </div>
            </div>
            <div class="grid md:grid-cols-1 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Description: </span>
                    {{ paymentDataEntries?.description }}
                </div>
            </div>
            <div class="p-2 border border-gray-200 rounded-lg">
                <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                    Payment Request Details
                </h2>
                <div class="overflow-x-auto">
                    <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <table class="min-w-full divide-y border border-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Particulars
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Project/Section Code
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vat
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Vat Amount
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="detail in paymentDataEntries?.details" :key="detail.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.particulars }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.stakeholder?.name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ accountingCurrency(detail?.cost) }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ accountingCurrency(detail?.total_vat_amount) }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ accountingCurrency(detail?.amount) }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div
                v-show="paymentDataEntries?.approvals"
                class="w-full"
            >
                <LayoutApprovalsListView :approvals="paymentDataEntries?.approvals" />
            </div>
        </template>
        <template #footer>
            <div class="flex gap-2 p-2 justify-end relative">
                <button
                    class="w-38 h-8 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                    @click="generateJournal(paymentDataEntries)"
                >
                    <Icon name="ic:baseline-send" color="white" class="w-5 h-5" />
                    Generate Journal
                </button>
            </div>
        </template>
    </PsModal>
</template>
