<script lang="ts" setup>
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"
import { useTransactionStore } from "~/stores/accounting/transaction"
// import { useStakeholderStore } from "~/stores/accounting/stakeholder"
// import { useStakeholderGroupStore } from "~/stores/accounting/stakeholdergroup"
import { useAccountStore } from "~/stores/accounting/account"

const accountStore = useAccountStore()
await accountStore.getAccounts()

const transactionTypeStore = useTransactionTypeStore()
const transactionStore = useTransactionStore()
// const stakeholderStore = useStakeholderStore()
// const stakeholderGroupStore = useStakeholderGroupStore()
const boardLoading = ref(false)
const snackbar = useSnackbar()
const removeDetail = (detail) => {
    transactionStore.transaction.transaction_details = transactionStore.transaction.transaction_details.filter(d => d !== detail)
}
// const detail = ref({
//     transaction_detail_id: null,
//     stakeholder_group_id: null,
//     stakeholder_group_name: null,
//     stakeholder_id: null,
//     debit: 0,
//     credit: 0
// })
const details = ref([])
// const addDetail = () => {
//     detail.value.stakeholder_group_name = stakeholderGroupStore.list.filter(s => s.stakeholder_group_id === detail.value.stakeholder_group_id)[0].stakeholder_group_name
//     detail.value.account_name = accountStore.list.filter(s => s.account_id === detail.value.account_id)[0].account_name
//     details.value.push(JSON.parse(JSON.stringify(detail.value)))
//     detail.value = {
//         transaction_detail_id: null,
//         stakeholder_group_id: null,
//         stakeholder_group_name: null,
//         debit: 0,
//         credit: 0
//     }
//     console.log(details.value)
// }

async function handleSubmit () {
    try {
        boardLoading.value = true
        transactionStore.transaction.period_id = 1
        transactionStore.transaction.details = JSON.stringify(transactionStore.transaction.transaction_details)
        transactionStore.transaction.stakeholder_id = transactionStore.transaction.stakeholder.stakeholder_id
        await transactionStore.editTransaction()
        if (transactionStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: transactionStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: transactionStore.successMessage
            })
        }
    } catch (error) {
        transactionStore.errorMessage = errorMessage
        snackbar.add({
            type: "error",
            text: transactionStore.errorMessage
        })
    } finally {
        // transactionStore.reset()
        boardLoading.value = false
        navigateTo("/accounting/journal-entry")
    }
}

// function cancelEdit () {
//     transactionTypeStore.isEdit = false
//     transactionTypeStore.reset()
// }
function select (val:any) {
    transactionStore.transaction.transaction_type_id = val.transaction_type_id
}
// function selectStakeholder (val:any) {
//     transactionStore.transaction.stakeholder_id = val.stakeholder_id
// }
// const accountsList = computed(() => {
//     return accountStore.list
//     if (transactionTypeStore.transactionType.book) {
//         return transactionTypeStore.transactionType.book.accounts
//     }
//     return []
// })

onMounted(() => {
    details.value = transactionStore.transaction.transaction_details
})
</script>
<template>
    <LayoutBoards title="Edit Transaction" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="!transactionTypeStore.isEdit?handleSubmit():updateType()">
            <div class="flex flex-col gap-2">
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="transaction_type"
                            class="text-xs italic"
                        >Transaction Type</label>
                        <AccountingSelectSearch
                            :options="transactionTypeStore.list"
                            title="transaction_type_name"
                            opid="transaction_type_id"
                            :selected-id="transactionStore.transaction.transaction_type_id"
                            disabled
                            @select="select"
                        />
                    </div>
                    <div class="flex-1">
                        <label
                            for="transaction_date"
                            class="text-xs italic"
                        >Journal Date</label>
                        <input
                            id="transactionDate"
                            v-model="transactionStore.transaction.transaction_date"
                            type="date"
                            class="w-full rounded-lg"
                            required
                            disabled
                        >
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="amount"
                            class="text-xs italic"
                        >Status</label>
                        <input
                            id="amount"
                            v-model="transactionStore.transaction.status"
                            type="text"
                            class="w-full rounded-lg"
                            disabled
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
                            v-model="transactionStore.transaction.transaction_no"
                            type="text"
                            class="w-full rounded-lg"
                            required
                            disabled
                        >
                    </div>
                </div>
                <div class="flex flex-col md:flex-row gap-4">
                    <div class="flex-1">
                        <label
                            for="status"
                            class="text-xs italic"
                        >Note</label>
                        <textarea v-model="transactionStore.transaction.note" class="w-full rounded-lg" disabled />
                    </div>
                </div>
                <!-- <span class="font-bold text-gray-700">
                    Transaction Details
                </span> -->
                <!-- <form action="" @submit.prevent="addDetail">
                    <div class="flex gap-2">
                        <div class="flex flex-col gap-1 flex-2">
                            <label for="" class="text-xs italic">
                                Stakeholder Group
                            </label>
                            <select
                                id="period"
                                v-model="detail.stakeholder_group_id"
                                class="w-full rounded-lg"
                                required
                            >
                                <option v-for="p in stakeholderGroupStore.list" :key="p.stakeholder_group_id" :value="p.stakeholder_group_id">
                                    {{ p.stakeholder_group_name }}
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
                                <option v-for="p in accountsList" :key="p.account_id" :value="p.account_id">
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
                            <Icon name="fa:plus-circle" class="mr-1" />
                            Add
                        </button>
                    </div>
                </form> -->
                <table class="table-auto boder w-full">
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
                                    <Icon name="iconoir:trash" class="mr-1" />
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div>
                    <label
                        for="details"
                        class="text-xs italic"
                    >Details</label>
                    <textarea
                        id="details"
                        v-model="transactionStore.transaction.details"
                        class="w-full rounded-lg"
                        required
                    />
                </div> -->
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
                    Update Transaction
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
