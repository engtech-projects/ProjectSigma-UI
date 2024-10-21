<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useVoucherStore } from "~/stores/accounting/voucher"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const { list: payeeList } = storeToRefs(useStakeholderStore())
const voucherStore = useVoucherStore()
const accountGroup = useAccountGroupStore()

const loading = ref(false)
const showNetAmount = ref(true)
const amountElement = ref()
const amount = computed(() => {
    return voucherStore.voucher.net_amount
})
watch(amount, (newAmount) => {
    voucherStore.voucher.amount_in_words = useAmountInWords(newAmount)
})

const focusNetAmount = () => {
    showNetAmount.value = false
}
watch(showNetAmount, (newValue) => {
    if (!newValue) {
        nextTick(() => {
            amountElement.value.focus()
        })
    }
})
const accountEntries = ref([])
// const accountId = computed(() => {
//     return voucherStore.voucher ? voucherStore.voucher.account_id : null
// })
// const print = () => {
//     toPrint.value = true
//     setTimeout(window.print, 500)
// }
onMounted(() => {
    // console.log(accountId.value)
    accountEntries.value = voucherStore.voucher.details
})
</script>
<template>
    <div>
        <div class="flex flex-col gap-16 pb-24 pt-8 relative">
            <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <AccountingCommonEvenparHeader />
            <h1 class="text-2xl text-center font-bold">
                DISBURSEMENT VOUCHER DETAILS
            </h1>
            <div class="flex flex-col gap-2">
                <div class="flex justify-end gap-4">
                    <h3 class="font-bold">
                        REFERENCE NO.
                    </h3>
                    <span class="border-b border-gray-800">
                        {{ voucherStore.voucher.voucher_no }}
                    </span>
                </div>
                <div class="flex flex-col gap-12 sm:flex-row">
                    <div class="flex flex-col flex-1 gap-2">
                        <div class="flex-1">
                            <label
                                for="payee"
                                class="text-xs italic"
                            >Payee</label>
                            <select :value="voucherStore.voucher ? voucherStore.voucher.stakeholder_id : null" class="w-full rounded-lg" disabled>
                                <option v-for="st in payeeList" :key="st.id" :value="st.id">
                                    {{ st.name }}
                                </option>
                            </select>
                        </div>
                        <!-- <div class="flex-1">
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
                        </div> -->
                        <div class="flex-1">
                            <label
                                for="particulars"
                                class="text-xs italic"
                            >Particulars</label>
                            <input
                                id="particulars"
                                v-model="voucherStore.voucher.particulars"
                                type="text"
                                class="w-full rounded-lg"
                                required
                                disabled
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Amount in words</label>
                            <input
                                id="amountInWords"
                                v-model="voucherStore.voucher.amount_in_words"
                                type="text"
                                class="w-full rounded-lg"
                                required
                                disabled
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="payee"
                                class="text-xs italic"
                            >Expense Accounts</label>
                            <select v-model="voucherStore.voucher.account_id" class="w-full rounded-lg">
                                <option v-for="ac in accountGroup.accountGroup.accounts" :key="ac.id" :value="ac.id">
                                    {{ ac.account_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-col flex-1 justify-start gap-2">
                        <div>
                            <label
                                for="encodedDate"
                                class="text-xs italic"
                            >Encoded Date</label>
                            <input
                                id="encodedDate"
                                :value="dateToString(new Date(voucherStore.voucher.date_encoded))"
                                type="date"
                                class="w-full rounded-lg"
                                required
                                disabled
                            >
                        </div>
                        <div>
                            <label
                                for="entryDate"
                                class="text-xs italic"
                            >Entry Date</label>
                            <input
                                id="entryDate"
                                :value="dateToString(new Date(voucherStore.voucher.voucher_date))"
                                type="date"
                                class="w-full rounded-lg"
                                required
                                disabled
                            >
                        </div>
                        <div>
                            <label
                                for="netAmount"
                                class="text-xs italic"
                            >Net Amount</label>
                            <input
                                v-show="!showNetAmount"
                                id="netAmount"
                                ref="amountElement"
                                v-model="voucherStore.voucher.net_amount"
                                type="number"
                                class="w-full rounded-lg"
                                required
                                disabled
                                @blur="showNetAmount=true"
                            >
                            <input
                                v-show="showNetAmount"
                                id="netAmount2"
                                type="text"
                                class="w-full rounded-lg"
                                :value="useUtilities().value.formatCurrency(voucherStore.voucher.net_amount)"
                                required
                                disabled
                                @focus="focusNetAmount()"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-4">
                <h2 class="text-xl font-bold text-center mb-10">
                    ACCOUNTING ENTRIES
                </h2>
                <div class="flex flex-col bg-gray-100 rounded-lg px-8 py-4 gap-2">
                    <div v-for="ae,i in accountEntries" :key="i" class="flex gap-2">
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Accounts</label>
                            <select v-model="ae.account_id" class="w-full rounded-lg h-9 text-sm bg-gray-100">
                                <option v-for="ac in accountGroup.accountGroup.accounts" :key="ac.id" :value="ac.id">
                                    {{ ac.account_name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Project/Section Code</label>
                            <select v-model="ae.stakeholder_id" class="w-full rounded-lg h-9 text-sm bg-gray-100">
                                <option v-for="st in payeeList" :key="st.id" :value="st.id">
                                    {{ st.name }}
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
                                v-model="ae.debit"
                                type="number"
                                class="w-full rounded-lg h-9 text-sm bg-gray-100"
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
                                v-model="ae.credit"
                                type="number"
                                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                                required
                            >
                        </div>
                    </div>
                </div>
                <span v-if="accountEntries.length === 0" class="block text-center text-gray-600">
                    No entries yet.
                </span>
            </div>
            <div class="flex justify-between">
                <NuxtLink
                    class="text-white p-2 px-4 rounded bg-orange-600 content-center mt-5 rounded-md w-fit"
                    :to="'/accounting/voucher/disbursement/print?id=' + voucherStore.voucher.id"
                >
                    <Icon name="ion:printer" /> Print
                </NuxtLink>
                <div class="flex gap-2">
                    <NuxtLink
                        to="/accounting/voucher/disbursement"
                        class="flex items-center text-white p-2 px-6 rounded bg-gray-600 content-center mt-5 rounded-md w-fit"
                    >
                        <span>Decline</span>
                    </NuxtLink>
                    <button
                        type="submit"
                        class="text-white p-2 px-4 rounded bg-teal-600 content-center mt-5 rounded-md w-fit"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
        <!-- <AccountingVoucherDisbursementPrint v-show="toPrint" @close="toPrint=false" /> -->
    </div>
</template>
<style>

</style>
