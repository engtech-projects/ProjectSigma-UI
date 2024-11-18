<script setup>
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/setup/accountgroups"
import { useJournalStore } from "~/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const accountGroupStore = useAccountGroupStore()
const stakeholderStore = useStakeHolderStore()

const emit = defineEmits(["create", "edit"])

const stakeholder = (id) => {
    return stakeholderStore.list.filter(st => st.id === id)[0]
}
const account = (id) => {
    return accountGroupStore.accountGroup.accounts.filter(st => st.id === id)[0]
}
const totalDebit = computed(() => {
    let amount = 0
    journalStore.journal.details.forEach((v) => {
        amount += parseFloat(v.debit)
    })
    return amount
})
const totalCredit = computed(() => {
    let amount = 0
    journalStore.journal.details.forEach((v) => {
        amount += parseFloat(v.credit)
    })
    return amount
})

const navigate = (url = "", action = "", journal = null) => {
    history.pushState(null, "", url)
    emit(action)
    if (journal) {
        journalStore.getJournal(journal.id)
    }
}
</script>
<template>
    <div class="bg-white shadow rounded-lg border border-gray-200 px-2 relative">
        <div v-if="journalStore.isLoading.show" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div class="flex justify-between items-center h-16 border-b px-4">
            <h2 class="text-xl text-gray-800">
                Journal Entry Details
            </h2>
        </div>
        <div class="flex flex-col p-4 w-full">
            <div class="flex gap-4 border-b py-4 w-full">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Journal No.</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ journalStore.journal.journal_no }}
                    </h4>
                </div>
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Journal Date</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ fullDate(journalStore.journal.journal_date) }}
                    </h4>
                </div>
            </div>
            <div class="flex gap-2 w-full justify-between py-4">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Status</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ journalStore.journal.status }}
                    </h4>
                </div>
                <div v-if="journalStore.journal.remarks" class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Remarks</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ journalStore.journal.remarks }}
                    </h4>
                </div>
            </div>
        </div>
        <form action="">
            <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                <h2 class="text-center font-bold text-gray-800">
                    PAYMENT REQUEST DETAILS
                </h2>
                <table v-if="journalStore.journal.details.length > 0" class="w-full mt-6">
                    <thead>
                        <tr>
                            <th class="border-2 border-gray-800 text-xs">
                                ACCOUNT
                            </th>
                            <th class="border-2 border-gray-800 text-xs w-1/3">
                                STAKEHOLDER
                            </th>
                            <th class="border-2 border-gray-800 text-xs">
                                DEBIT
                            </th>
                            <th class="border-2 border-gray-800 text-xs w-24">
                                CREDIT
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ae,i in journalStore.journal.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ stakeholder(ae.stakeholder_id)?.name }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ account(ae.account_id)?.account_name }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ formatToCurrency(ae.debit) }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ formatToCurrency(ae.credit) }}
                            </td>
                        </tr>
                        <tr>
                            <td />
                            <td class="text-center font-bold py-2">
                                TOTAL
                            </td>
                            <td class="border-b-2 border-black font-bold py-2 px-4">
                                {{ formatToCurrency(totalDebit) }}
                            </td>
                            <td class="border-b-2 border-black font-bold py-2 px-4">
                                {{ formatToCurrency(totalCredit) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <i v-else class="text-center block mt-4 mb-2 text-gray-500">
                    There are no details.
                </i>
            </div>
        </form>
        <div class="flex justify-between w-full mb-8 gap-2 items-center mt-5">
            <button
                class="text-gray-700 self-start hover:text-blue-500 border-gray-700 mt-2"
                @click.prevent="navigate('/accounting/payment-request', 'create')"
            >
                <Icon name="ion:ios-arrow-thin-left" class="mr-1 text-2xl" />
                Back to create
            </button>
            <div class="flex gap-2">
                <button
                    class="text-white p-2 px-6 bg-green-500 content-center rounded-md w-fit flex items-center"
                    @click="navigate('/accounting/journal-entry?edit=' + journalStore.journal.id, 'edit')"
                >
                    <Icon name="iconoir:edit" class="text-xl mr-2" />
                    Edit
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped>
</style>
