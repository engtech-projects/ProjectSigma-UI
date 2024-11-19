<script lang="ts" setup>
import { useTransactionStore } from "~/stores/accounting/transactions/transaction"
const transactionStore = useTransactionStore()

const details = ref([])
onMounted(() => {
    details.value = transactionStore.transaction.transaction_details
})
</script>
<template>
    <LayoutBoards title="Entry Details" class="w-full h-fit">
        <form>
            <div class="flex flex-col gap-2 px-4 md:px-1 mb-12">
                <div class="flex flex-col md:flex-row gap-4">
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
                            disabled
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
                            disabled
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
                        <textarea v-model="transactionStore.transaction.note" class="w-full rounded-lg" disabled />
                    </div>
                </div>
                <span class="font-bold text-gray-700 mt-8">
                    Journal Entries
                </span>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="flex justify-end gap-4">
                <div class="flex-2" />
                <NuxtLink
                    to="/accounting/journal-entry"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Go Back
                </NuxtLink>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
