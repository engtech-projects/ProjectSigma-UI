<script lang="ts" setup>
import { useAccountStore } from "~/stores/accounting/account"
const { list: accountsList } = storeToRefs(useAccountStore())
const data = ref({
    entry_date: dateToString(new Date())
})
const accountEntry = ref({
    account_id: null,
    account_code: null,
    account_name: null,
    project_id: null,
    project_code: null,
    debit: 0,
    credit: 0
})
const selectedAccount = computed(() => {
    return accountsList.value.filter(a => a.account_id === accountEntry.value.account_id)[0]
})
const accountEntries = ref([])
const addLine = () => {
    accountEntry.value.account_code = selectedAccount.value.account_number
    accountEntry.value.account_name = selectedAccount.value.account_name
    accountEntries.value.push(JSON.parse(JSON.stringify(accountEntry.value)))
    accountEntry.value = {
        account_id: null,
        account_code: null,
        account_name: null,
        project_id: null,
        project_code: null,
        debit: 0,
        credit: 0
    }
}
const removeLine = (line: object) => {
    accountEntries.value = accountEntries.value.filter(acc => acc !== line)
}
</script>
<template>
    <div class="flex flex-col gap-16 pb-24 pt-8">
        <AccountingCommonEvenparHeader />
        <h1 class="text-2xl text-center font-bold">
            DISBURSEMENT VOUCHER
        </h1>
        <div class="flex flex-col gap-2">
            <div class="flex justify-end gap-4">
                <h3 class="font-bold">
                    REFERENCE NO.
                </h3>
                <span class="border-b border-gray-800">
                    AJE-202402-0566
                </span>
            </div>
            <div class="flex gap-12">
                <div class="flex flex-col flex-1 gap-2">
                    <div class="flex-1">
                        <label
                            for="payee"
                            class="text-xs italic"
                        >Payee</label>
                        <input
                            id="payee"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="paymentTerms"
                            class="text-xs italic"
                        >Payment Terms</label>
                        <select id="paymentTerms" class="w-full rounded-lg">
                            <option value="monthly">
                                Monthly
                            </option>
                            <option value="quarterly">
                                Quarterly
                            </option>
                            <option value="annually">
                                Annually
                            </option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label
                            for="particulars"
                            class="text-xs italic"
                        >Particulars</label>
                        <input
                            id="particulars"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
                <div class="flex flex-col flex-1">
                    <div class="flex-1">
                        <label
                            for="entryDate"
                            class="text-xs italic"
                        >Entry Date</label>
                        <input
                            id="entryDate"
                            v-model="data.entry_date"
                            type="date"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="paymentMethod"
                            class="text-xs italic"
                        >Payment Method</label>
                        <select id="paymentMethod" class="w-full rounded-lg">
                            <option value="cash">
                                Cash
                            </option>
                            <option value="check">
                                Check
                            </option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label
                            for="netAmount"
                            class="text-xs italic"
                        >Net Amount</label>
                        <input
                            id="netAmount"
                            type="number"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-16 flex flex-col gap-12">
            <h2 class="text-xl font-bold text-center">
                ACCOUNTING ENTRIES
            </h2>
            <form @submit.prevent="addLine">
                <div class="flex gap-2">
                    <div class="flex-1">
                        <label
                            for="amountInWords"
                            class="text-xs italic"
                        >Accounts</label>
                        <select v-model="accountEntry.account_id" class="w-full rounded-lg">
                            <option v-for="account in accountsList" :key="account.account_id" :value="account.account_id">
                                {{ account.account_name }}
                            </option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label
                            for="amountInWords"
                            class="text-xs italic"
                        >Project/Section Code</label>
                        <select v-model="accountEntry.project_id" class="w-full rounded-lg">
                            <option value="sample">
                                Sample Code
                            </option>
                        </select>
                    </div>
                    <div class="flex-1">
                        <label
                            for="debit"
                            class="text-xs italic"
                        >Debit</label>
                        <input
                            id="debit"
                            v-model="accountEntry.debit"
                            type="number"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="credit"
                            class="text-xs italic"
                        >Credit</label>
                        <input
                            id="credit"
                            v-model="accountEntry.credit"
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
            <table v-if="accountEntries.length > 0" class="w-full">
                <thead>
                    <tr>
                        <th class="border-2 border-gray-800 text-sm">
                            ACCOUNT CODE
                        </th>
                        <th class="border-2 border-gray-800 text-sm w-1/3">
                            ACCOUNT NAME
                        </th>
                        <th class="border-2 border-gray-800 text-sm">
                            PROJECT/SECTION CODE
                        </th>
                        <th class="border-2 border-gray-800 text-sm w-24">
                            DEBIT
                        </th>
                        <th class="border-2 border-gray-800 text-sm w-24">
                            CREDIT
                        </th>
                        <th class="border-2 border-gray-800 text-sm w-2" />
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ae,i in accountEntries" :key="i" class="hover:bg-gray-100 cursor-pointer">
                        <td class="border px-4 py-1 border-gray-800 relative">
                            {{ ae.account_code }}
                        </td>
                        <td class="border px-4 py-1 border-gray-800">
                            {{ ae.account_name }}
                        </td>
                        <td class="border px-4 py-1 border-gray-800">
                            {{ ae.project_id }}
                        </td>
                        <td class="border px-4 py-1 border-gray-800">
                            {{ ae.debit }}
                        </td>
                        <td class="border px-4 py-1 border-gray-800">
                            {{ ae.credit }}
                        </td>
                        <td class="border px-4 py-1 border-gray-800">
                            <Icon name="ion:trash" class="text-xl text-gray-500 hover:text-red-600" @click="removeLine(ae)" />
                        </td>
                    </tr>
                    <!-- <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>
                    <tr>
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800" />
                        <td class="border px-4 py-1 border-gray-800">
                            0
                        </td>
                    </tr>

                    <tr class="border-0">
                        <td class="" />
                        <td class="" />
                        <td class="font-bold text-center pt-3">
                            TOTAL
                        </td>
                        <td class="border-b-2 border-gray-800" />
                        <td class="border-b-2 border-gray-800" />
                    </tr> -->
                </tbody>
            </table>
            <span v-else class="block text-center text-gray-600">
                No entries yet.
            </span>
        </div>
        <div class="flex gap-24">
            <span class="border-b-2 border-black pb-16 font-bold flex-1">
                REQUESTED BY:
            </span>
            <span class="border-b-2 border-black pb-16 font-bold flex-1">
                APPROVED BY:
            </span>
            <span class="border-b-2 border-black pb-16 font-bold flex-1">
                RECEIVED BY:
            </span>
        </div>
    </div>
</template>
<style>

</style>
