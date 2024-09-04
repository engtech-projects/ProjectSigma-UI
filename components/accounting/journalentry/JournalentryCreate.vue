<script lang="ts" setup>
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"
import { useTransactionStore } from "~/stores/accounting/transaction"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useStakeholderGroupStore } from "~/stores/accounting/stakeholdergroup"
import { useAccountStore } from "~/stores/accounting/account"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useJournalStore } from "~/stores/accounting/journal"

const journalStore = useJournalStore()
const accountGroupStore = useAccountGroupStore()
const accountStore = useAccountStore()
await accountStore.getAccounts()

const transactionTypeStore = useTransactionTypeStore()
await transactionTypeStore.getTransactionTypes()
const transactionStore = useTransactionStore()
const stakeholderStore = useStakeholderStore()
await stakeholderStore.getStakeholders()
const stakeholderGroupStore = useStakeholderGroupStore()
await stakeholderGroupStore.getStakeholderGroups()
const boardLoading = ref(false)
const snackbar = useSnackbar()
transactionStore.transaction.transaction_date = useUtilities().value.dateToString(new Date())
const removeDetail = (detail) => {
    details.value = details.value.filter(d => d !== detail)
}
const detail = ref({
    transaction_detail_id: null,
    stakeholder_id: null,
    stakeholder_name: null,
    account_id: null,
    account_name: null,
    debit: 0,
    credit: 0
})
const details = ref([])
const addDetail = () => {
    detail.value.stakeholder_name = stakeholderStore.list.filter(s => s.stakeholder_id === detail.value.stakeholder_id)[0].display_name
    detail.value.account_name = accountStore.list.filter(s => s.account_id === detail.value.account_id)[0].account_name
    details.value.push(JSON.parse(JSON.stringify(detail.value)))
    detail.value = {
        transaction_detail_id: null,
        stakeholder_id: null,
        stakeholder_name: null,
        account_id: null,
        account_name: null,
        debit: 0,
        credit: 0
    }
}

async function handleSubmit () {
    try {
        boardLoading.value = true
        journalStore.journal.entry.status = "open"
        journalStore.journal.entry.amount = 100
        journalStore.journal.entry.stakeholder_id = 2
        journalStore.journal.details = tdetails.value
        journalStore.journal.entry.description = "No description."
        await journalStore.createJournal()
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
            navigateTo("/accounting/journal-entry")
        }
    } catch (error) {
        journalStore.errorMessage = errorMessage
        snackbar.add({
            type: "error",
            text: journalStore.errorMessage
        })
    } finally {
        // transactionStore.reset()
        boardLoading.value = false
    }
}

// function cancelEdit () {
//     transactionTypeStore.isEdit = false
//     transactionTypeStore.reset()
// }
// function select (val:any) {
//     transactionTypeStore.transactionType = val
//     transactionStore.transaction.transaction_type_id = val.transaction_type_id
// }

const tdetails = computed(() => {
    const dds = ref([])
    details.value.forEach((detail) => {
        const dd = ref({
            stakeholder_id: null,
            account_id: null,
            debit: 0,
            credit: 0
        })
        dd.value.stakeholder_id = detail.stakeholder_id
        dd.value.account_id = detail.account_id
        dd.value.debit = detail.debit
        dd.value.credit = detail.credit
        dds.value.push(dd.value)
    })
    return dds.value
})

const journalBase = computed(() => {
    return journalStore.base.length > 0 ? journalStore.base[0] : null
})

const accountsList = computed(() => {
    return accountGroupStore.list.filter(a => a.account_group_id === journalBase.value.book.account_group_id)[0]
})
// await accountGroupStore.showAccountGroup(journalBase.book.account_group_id)

// onMounted(() => {
//     console.log(accountsList.value)
// })

</script>

<template>
    <LayoutBoards title="New Entry" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="handleSubmit">
            <div class="flex flex-col gap-2 px-4 md:px-1">
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <label
                            for="transaction_date"
                            class="text-xs italic"
                        >Journal Date</label>
                        <input
                            id="transactionDate"
                            v-model="journalStore.journal.entry.transaction_date"
                            type="date"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="status"
                            class="text-xs italic"
                        >Status</label>
                        <input
                            id="particulars"
                            v-model="journalStore.journal.entry.status"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="transaction_type"
                            class="text-xs italic"
                        >Journal No.</label>
                        <input
                            id="journalNo"
                            v-model="journalStore.journal.entry.transaction_no"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
                <!-- <div class="flex gap-4">
                </div> -->
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <label
                            for="status"
                            class="text-xs italic"
                        >Note</label>
                        <textarea v-model="journalStore.journal.entry.note" class="w-full rounded-lg" />
                    </div>
                </div>
                <span class="font-bold text-gray-700 mt-8">
                    Journal Entries
                </span>
                <form action="" @submit.prevent="addDetail">
                    <div class="flex flex-col lg:flex-row gap-2">
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Project/Section Code
                            </label>
                            <select
                                id="period"
                                v-model="detail.stakeholder_id"
                                class="w-full rounded-lg"
                                required
                            >
                                <option v-for="p in stakeholderStore.list" :key="p.stakeholder_id" :value="p.stakeholder_id">
                                    {{ p.display_name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Accounts
                            </label>
                            <select
                                id="period"
                                v-model="detail.account_id"
                                class="w-full rounded-lg"
                                required
                            >
                                <option v-for="p in accountsList.accounts" :key="p.account_id" :value="p.account_id">
                                    {{ p.account_name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Debit
                            </label>
                            <input
                                id="amount"
                                v-model="detail.debit"
                                type="number"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Credit
                            </label>
                            <input
                                id="amount"
                                v-model="detail.credit"
                                type="number"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <button
                            type="submit"
                            class="text-white p-2 px-4 rounded bg-teal-600 content-center mt-5 rounded-md w-fit"
                        >
                            Add line
                        </button>
                    </div>
                </form>
                <div class="flex flex-col gap-2 mt-4">
                    <table v-if="details.length > 0" class="table-auto boder w-full">
                        <thead class="bg-slate-100">
                            <th class="text-left px-2 border-y py-2 uppercase">
                                Account
                            </th>
                            <th class="text-left px-2 border-y py-2 uppercase">
                                Stakeholder
                            </th>
                            <th class="text-left px-2 border-y py-2 uppercase">
                                Debit
                            </th>
                            <th class="text-left px-2 border-y py-2 uppercase">
                                Credit
                            </th>
                            <th class="text-left px-2 border-y py-2 uppercase" />
                        </thead>
                        <tbody>
                            <tr v-for="d,i in details" :key="i" class="border-y">
                                <td class="p-2">
                                    {{ d.account_name }}
                                </td>
                                <td class="p-2">
                                    {{ d.stakeholder_name }}
                                </td>
                                <td class="p-2">
                                    {{ d.debit }}
                                </td>
                                <td class="p-2">
                                    {{ d.credit }}
                                </td>
                                <td class="p-2">
                                    <button
                                        class="text-white p-2 px-4 rounded bg-red-600 content-center mt-5 rounded-md w-fit"
                                        @click.prevent="removeDetail(d)"
                                    >
                                        <Icon name="ion:trash" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/journal-entry"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Save Entry
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
