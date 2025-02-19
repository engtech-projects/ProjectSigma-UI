<script setup>
import { useJournalStore } from "@/stores/accounting/journals/journal"
const journalStore = useJournalStore()
const { journal } = storeToRefs(journalStore)
const snackbar = useSnackbar()
defineProps({
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})

const details = ref({
    account_id: null,
    debit: 0,
    credit: 0,
    remarks: ""
})

const addDetails = () => {
    details.value = {
        account_id: null,
        debit: 0,
        credit: 0,
        remarks: ""
    }
    journal.value.details.push(details.value)
}

const removeDetails = (index) => {
    journal.value.details.splice(index, 1)
}

const createJournalEntry = async () => {
    try {
        await journalStore.addJournal()
        if (journal.value.successMessage) {
            snackbar.add({
                type: "success",
                text: journal.value.successMessage
            })
        } else {
            snackbar.add({
                type: "error",
                text: journal.value.errorMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: journal.value.errorMessage
        })
    }
}
journal.value.total_debit = computed(() => {
    return journal.value.details.reduce((acc, item) => acc + parseFloat(item.debit), 0)
})
journal.value.total_credit = computed(() => {
    return journal.value.details.reduce((acc, item) => acc + parseFloat(item.credit), 0)
})
journal.value.entry_balance = computed(() => {
    return journal.value.total_debit - journal.value.total_credit
})
</script>
<template>
    <LayoutBoards title="" class="w-90" :loading="journal.isLoading">
        <div>
            <form @submit.prevent="createJournalEntry">
                <div class="flex flex-col gap-16 pt-8 sticky">
                    <h1 class="text-2xl text-center font-bold">
                        JOURNAL ENTRY FORM
                    </h1>
                    <div class="w-full">
                        <div class="flex gap-2">
                            <div class="w-full">
                                <label
                                    for="journal_no"
                                    class="text-xs italic"
                                >Journal Number</label>
                                <input
                                    id="journal_no"
                                    v-model="journal.journal_no"
                                    type="text"
                                    disabled
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                            <div class="w-full">
                                <label
                                    for="reference_no"
                                    class="text-xs italic"
                                >Reference Number (PRF-No)</label>
                                <input
                                    id="reference_no"
                                    v-model="journal.reference_no"
                                    type="text"
                                    disabled
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    for="date"
                                    class="text-xs italic"
                                >Entry Date:</label>
                                <input
                                    id="date"
                                    v-model="journal.entry_date"
                                    type="date"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                            <div>
                                <label
                                    for="remarks"
                                    class="text-xs italic"
                                >Remarks</label>
                                <textarea
                                    id="remarks"
                                    v-model="journal.remarks"
                                    class="w-full rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-bold text-center">
                                JOURNAL ENTRY DETAILS
                            </h2>
                            <button
                                class="text-white p-2 px-4 bg-teal-600 content-center mt-5 rounded-md w-fit"
                                @click.prevent="addDetails"
                            >
                                <Icon name="fa:plus-circle" />
                            </button>
                        </div>
                        <div v-show="journalStore.journal.details.length > 0" class="flex flex-col bg-white rounded-lg gap-2">
                            <AccountingJournalDetailItem
                                v-for="(_detail, idx) in journal.details"
                                :key="'detail'+idx"
                                v-model:details="journal.details[idx]"
                                :total-debit="journal.total"
                                :index="idx"
                                :item-count="journal.details.length"
                                @delete-item="removeDetails(idx)"
                            />
                        </div>
                        <span v-if="journal.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-end p-4 bg-gray-100 rounded-lg">
                            <div class="flex gap-8">
                                <div>
                                    <label class="text-xs italic">Total Debit</label>
                                    <input
                                        :value="journal.total_debit"
                                        type="number"
                                        class="w-full rounded-lg h-9 text-sm bg-white"
                                        disabled
                                    >
                                </div>
                                <div>
                                    <label class="text-xs italic">Total Credit</label>
                                    <input
                                        :value="journal.total_credit"
                                        type="number"
                                        class="w-full rounded-lg h-9 text-sm bg-white"
                                        disabled
                                    >
                                </div>
                                <div>
                                    <label class="text-xs italic">Balance</label>
                                    <input
                                        :value="journal.entry_balance"
                                        type="number"
                                        class="w-full rounded-lg h-9 text-sm bg-white"
                                        disabled
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="flex gap-2">
                            <button
                                type="submit"
                                class="text-white p-2 bg-teal-600 content-center rounded-md w-fit"
                            >
                                Create Journal Entry
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </LayoutBoards>
</template>
