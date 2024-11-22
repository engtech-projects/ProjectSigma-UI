<script setup>
import { useStakeHolderStore } from "~/stores/accounting/setup/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/setup/accountgroups"
import { useJournalStore } from "~/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const { list: payeeList } = storeToRefs(useStakeHolderStore())
const accountGroupStore = useAccountGroupStore()
const snackbar = useSnackbar()
const accountEntry = ref({
    account_id: null,
    stakeholder_id: null,
    debit: 0,
    credit: 0
})
const emit = defineEmits(["view-details"])
async function handleSubmit () {
    journalStore.journal.details = toSaveEntries.value
    try {
        await journalStore.editJournal()
        if (journalStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: journalStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: journalStore.successMessage
            })
        }
    } catch (error) {
    }
}

const addEntry = () => {
    journalStore.journal.details.push(JSON.parse(JSON.stringify(accountEntry.value)))
}
const removeEntry = (entry) => {
    journalStore.journal.details = journalStore.journal.details.filter(e => e !== entry)
}
const toSaveEntries = computed(() => {
    const list = []
    journalStore.journal.details.forEach((j) => {
        j.journal_entry_id = journalStore.journal.id
        list.push(j)
    })
    return list
})
const navigate = (url = "", action = "", journal = null) => {
    history.pushState(null, "", url)
    emit(action)
    if (journal) {
        journalStore.getJournal(journal.id)
    }
}

onMounted(() => {
    journalStore.journal.journal_date = dateToString(new Date(journalStore.journal.journal_date))
})

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="bg-white shadow rounded-lg border border-green-500 border-t-4 px-2 relative">
            <AccountingLoadScreen :is-loading="journalStore.isLoading.edit" />
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Edit Journal Entry
                </h2>
            </div>
            <div class="flex flex-col gap-3 p-4 w-full">
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="journalNo" class="block text-sm font-medium text-gray-900 dark:text-white">Journal No.</label>
                        <input id="journalNo" v-model="journalStore.journal.journal_no" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1">
                        <label for="journalDate" class="block text-sm font-medium text-gray-900 dark:text-white">Journal Date</label>
                        <input id="journalDate" v-model="journalStore.journal.journal_date" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="journalNo" class="block text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        <select v-model="journalStore.journal.status" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="draft">
                                Draft
                            </option>
                            <option value="open">
                                Open
                            </option>
                        </select>
                    </div>
                </div>
            </div>
            <form action="">
                <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                    <h2 class="text-center font-bold text-gray-800">
                        JOURNAL ENTRIES
                    </h2>
                    <div class="flex flex-col w-full gap-2 mt-4">
                        <div v-for="ac,i in journalStore.journal.details" :key="i" class="flex gap-1 w-full items-end">
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Accounts</label>
                                <AccountingSelectSearch
                                    id="accounts"
                                    v-model="ac.account_id"
                                    class="bg-gray-50 border-gray-200"
                                    :class="'z-' + (30 - i)"
                                    height="h-30"
                                    :options="accountGroupStore.accountGroup.accounts"
                                    :selected-id="ac.account_id"
                                    title="account_name"
                                    opid="id"
                                    @select="ac.account_id = $event.id"
                                />
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Stakeholder</label>
                                <AccountingSelectSearch
                                    class="bg-gray-50 border-gray-200"
                                    :class="'z-' + (30 - i)"
                                    height="h-30"
                                    :options="payeeList"
                                    :selected-id="ac.stakeholder_id"
                                    title="name"
                                    opid="id"
                                    @select="ac.stakeholder_id = $event.id"
                                />
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Debit</label>
                                <input v-model="ac.debit" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Credit</label>
                                <input v-model="ac.credit" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <Icon name="ion:close-round" class="text-red-400 text-2xl mb-1 cursor-pointer hover:text-red-500 active:text-red-600" @click="removeEntry(ac)" />
                        </div>
                    </div>
                    <i v-if="journalStore.journal.details.length === 0" class="text-center block mt-4 mb-2 text-gray-500">
                        There are no entries yet.
                    </i>
                    <div v-if="journalStore.journal.details.length > 0" class="flex justify-left w-full mt-1">
                        <button
                            class="
                                border
                                px-4
                                rounded-xl
                                text-xs
                                py-[2px]
                                bg-green-400
                                cursor-pointer
                                hover:bg-green-500
                                active:bg-green-600"
                            @click.prevent="addEntry"
                        >
                            + Add Entry
                        </button>
                    </div>
                    <button
                        v-else
                        class="
                            border
                            rounded-xl
                            px-4
                            text-xs
                            py-[2px]
                            bg-green-400
                            cursor-pointer
                            hover:bg-green-500
                            active:bg-green-600"
                        @click.prevent="addEntry"
                    >
                        + Add Entry
                    </button>
                </div>
            </form>
            <div class="flex justify-between items-center w-full mb-8 mt-8">
                <button
                    class="text-gray-700 self-start hover:text-blue-500 border-gray-700"
                    @click.prevent="navigate('/accounting/journal-entry?details=' + journalStore.journal.id, 'view-details')"
                >
                    <Icon name="ion:ios-arrow-thin-left" class="mr-1 text-2xl" />
                    Back to details
                </button>
                <div class="flex gap-2">
                    <button
                        type="submit"
                        class="text-white p-1 px-6 border-teal-600 bg-teal-600 content-center rounded-md w-fit"
                    >
                        Update Journal
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>
.z-30 {
    z-index: 30;
}
.z-29 {
    z-index: 29;
}
.z-28 {
    z-index: 28;
}
.z-27 {
    z-index: 27;
}
.z-26 {
    z-index: 26;
}
.z-30 {
    z-index: 30;
}
.z-25 {
    z-index: 25;
}
.z-24 {
    z-index: 24;
}
.z-23 {
    z-index: 23;
}
.z-22 {
    z-index: 22;
}
.z-21 {
    z-index: 21;
}
.z-20 {
    z-index: 20;
}
.z-19 {
    z-index: 19;
}
.z-18 {
    z-index: 18;
}
.z-17 {
    z-index: 17;
}
.z-16 {
    z-index: 16;
}
.z-15 {
    z-index: 15;
}
.z-14 {
    z-index: 14;
}
.z-13 {
    z-index: 13;
}
</style>
