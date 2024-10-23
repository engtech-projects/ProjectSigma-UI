<script lang="ts" setup>
import { useAccountStore } from "~/stores/accounting/account"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useVoucherStore } from "~/stores/accounting/voucher"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useVoucherStore } from "~/stores/accounting/voucher"
import { useBookStore } from "~/stores/accounting/book"

const { list: accountsList } = storeToRefs(useAccountStore())
const { list: payeeList } = storeToRefs(useStakeholderStore())
<<<<<<< HEAD
const voucherStore = useVoucherStore()
const bookStore = useBookStore()
const snackbar = useSnackbar()
const accountGroup = useAccountGroupStore()

const loading = ref(false)
const showNetAmount = ref(true)
const amountElement = ref()
=======
const accountGroupStore = useAccountGroupStore()
const voucherStore = useVoucherStore()
const bookStore = useBookStore()

const loading = ref(false)
const snackbar = useSnackbar()
>>>>>>> 75722efe (Voucher ui revamp with fx)
const accountEntry = ref({
    account_id: null,
    stakeholder_id: null,
    debit: 0,
    credit: 0
})
async function handleSubmit () {
    try {
        loading.value = true
<<<<<<< HEAD
        voucherStore.voucher.book_id = bookStore.disbursement.id
        voucherStore.voucher.account_id = 1
        voucherStore.voucher.details = lineItems.value
        voucherStore.voucher.book_id = 1
=======
        voucherStore.voucher.book_id = bookStore.cash.id
>>>>>>> 75722efe (Voucher ui revamp with fx)
        await voucherStore.createVoucher()
        if (voucherStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: voucherStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: voucherStore.successMessage
            })
<<<<<<< HEAD
            navigateTo("/accounting/voucher/disbursement")
        }
    } catch (error) {
        // voucherStore.errorMessage = error.Message
        // snackbar.add({
        //     type: "error",
        //     text: voucherStore.errorMessage
        // })
    } finally {
        loading.value = false
    }
}
const selectedAccount = computed(() => {
    return accountsList.value.filter(a => a.id === accountEntry.value.account_id)[0]
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
const amount = computed(() => {
    return voucherStore.voucher.net_amount
})
watch(amount, (newAmount) => {
    voucherStore.voucher.amount_in_words = useAmountInWords(newAmount)
})
const removeLine = (line: object) => {
    accountEntries.value = accountEntries.value.filter(acc => acc !== line)
}
const lineItems = computed(() => {
    const arr = []
    accountEntries.value.forEach((entry) => {
        arr.push({
            account_id: entry.account_id,
            stakeholder_id: entry.project_id,
            debit: entry.debit,
            credit: entry.credit
        })
    })
    return arr
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
const selectExpense = (val) => {
    voucherStore.voucher.account_id = val.id
}
const selectPayee = (val) => {
    voucherStore.voucher.stakeholder_id = val.id
}
onMounted(() => {
    voucherStore.voucher.voucher_date = dateToString(new Date())
    voucherStore.voucher.date_encoded = dateToString(new Date())
=======
            voucherStore.reset()
        }
    } catch (error) {
    } finally {
        loading.value = false
    }
}
const amount = computed(() => {
    return voucherStore.voucher.net_amount
})
watch(amount, (newAmount) => {
    voucherStore.voucher.amount_in_words = useAmountInWords(newAmount)
})
const addEntry = () => {
    voucherStore.voucher.details.push(JSON.parse(JSON.stringify(accountEntry.value)))
}
const removeEntry = (entry) => {
    voucherStore.voucher.details = voucherStore.voucher.details.filter(e => e !== entry)
}
onMounted(() => {
    voucherStore.voucher.voucher_date = dateToString(new Date())
    voucherStore.voucher.date_encoded = dateToString(new Date())
    voucherStore.voucher.net_amount = 0
>>>>>>> 75722efe (Voucher ui revamp with fx)
})
</script>
<template>
    <form @submit.prevent="handleSubmit">
<<<<<<< HEAD
        <div class="flex flex-col gap-16 pb-24 pt-8 relative">
=======
        <div class="bg-white shadow rounded-lg border border-gray-200 px-2">
>>>>>>> 75722efe (Voucher ui revamp with fx)
            <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
<<<<<<< HEAD
            </div>
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
                            <AccountingSelectSearch
                                class="z-50"
                                :options="payeeList"
                                title="name"
                                opid="id"
                                :selected-id="voucherStore.voucher.stakeholder_id"
                                @select="selectPayee"
                            />
                            <!-- <select v-model="voucherStore.voucher.stakeholder_id" class="w-full rounded-lg">
                                <option v-for="st in payeeList" :key="st.id" :value="st.id">
                                    {{ st.name }}
                                </option>
                            </select> -->
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
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="payee"
                                class="text-xs italic"
                            >Expense Accounts</label>
                            <!-- <select v-model="voucherStore.voucher.account_id" class="w-full rounded-lg">
                                <option v-for="ac in accountGroup.accountGroup.accounts" :key="ac.id" :value="ac.id">
                                    {{ ac.account_name }}
                                </option>
                            </select> -->
                            <AccountingSelectSearch
                                class="z-40"
                                :options="accountGroup.accountGroup.accounts"
                                title="account_name"
                                opid="id"
                                :selected-id="voucherStore.voucher.account_id"
                                @select="selectExpense"
                            />
                        </div>
                    </div>
                    <div class="flex flex-col flex-1 justify-start gap-2">
                        <div class="">
                            <label
                                for="encodedDate"
                                class="text-xs italic"
                            >Encoded Date</label>
                            <input
                                id="encodedDate"
                                v-model="voucherStore.voucher.date_encoded"
                                type="date"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <div class="">
                            <label
                                for="entryDate"
                                class="text-xs italic"
                            >Entry Date</label>
                            <input
                                id="entryDate"
                                v-model="voucherStore.voucher.voucher_date"
                                type="date"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <!-- <div class="">
                            <label
                                for="paymentMethod"
                                class="text-xs italic"
                            >Payment Method</label>
                            <select id="paymentMethod" class="w-full rounded-lg">
                                <option value="cash">
                                    acc
                                </option>
                                <option value="check">
                                    Check
                                </option>
                            </select>
                        </div> -->
                        <div class="">
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
                                @blur="showNetAmount=true"
                            >
                            <input
                                v-show="showNetAmount"
                                id="netAmount2"
                                type="text"
                                class="w-full rounded-lg"
                                :value="useUtilities().value.formatCurrency(voucherStore.voucher.net_amount)"
                                required
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
                <form @submit.prevent="addLine">
                    <div class="flex flex-col lg:flex-row gap-2 bg-yellow-100 rounded-lg px-6 py-4">
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Accounts</label>
                            <AccountingSelectSearch
                                class="bg-white z-30"
                                :options="accountGroup.accountGroup.accounts"
                                title="account_name"
                                opid="id"
                                :selected-id="accountEntry.account_id"
                                @select="accountEntry.account_id = $event.id"
                            />
                            <!-- <select v-model="accountEntry.account_id" class="w-full rounded-lg">
                                <option v-for="account in accountGroup.accountGroup.accounts" :key="account.id" :value="account.id">
                                    {{ account.account_name }}
                                </option>
                            </select> -->
                        </div>
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Project/Section Code</label>
                            <!-- <select v-model="accountEntry.project_id" class="w-full rounded-lg">
                                <option v-for="st in payeeList" :key="st.id" :value="st.id">
                                    {{ st.name }}
                                </option>
                            </select> -->
                            <AccountingSelectSearch
                                class="bg-white z-20"
                                :options="payeeList"
                                title="name"
                                opid="id"
                                :selected-id="accountEntry.project_id"
                                @select="accountEntry.project_id=$event.id"
                            />
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
                                :disabled="accountEntry.credit > 0"
                                required
                                @blur="accountEntry.debit = accountEntry.debit === '' ? 0 : accountEntry.debit"
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
                                :disabled="accountEntry.debit > 0"
                                required
                                @blur="accountEntry.credit = accountEntry.credit === '' ? 0 : accountEntry.credit"
                            >
                        </div>
=======
            </div>
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Disbursement Voucher
                </h2>
            </div>
            <div class="flex flex-col gap-3 p-4 w-full">
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="referenceNo" class="block text-sm font-medium text-gray-900 dark:text-white">Reference No.</label>
                        <input id="referenceNo" v-model="voucherStore.voucher.voucher_no" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="payee" class="block text-sm font-medium text-gray-900 dark:text-white">Payee</label>
                        <AccountingSelectSearch
                            class="z-50 bg-gray-50 border-gray-200"
                            :options="payeeList"
                            title="name"
                            opid="id"
                            :selected-id="voucherStore.voucher.stakeholder_id"
                            @select="voucherStore.voucher.stakeholder_id = $event.id"
                        />
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="dateEncoded" class="block text-sm font-medium text-gray-900 dark:text-white">Encoded Date</label>
                        <input id="dateEncoded" v-model="voucherStore.voucher.date_encoded" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="dateCreate" class="block text-sm font-medium text-gray-900 dark:text-white">Created Date</label>
                        <input id="dateCreate" v-model="voucherStore.voucher.voucher_date" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="netAmount" class="block text-sm font-medium text-gray-900 dark:text-white">Net Amount</label>
                        <input id="netAmount" v-model="voucherStore.voucher.net_amount" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="amountWords" class="block text-sm font-medium text-gray-900 dark:text-white">Amount in words</label>
                        <input id="amountWords" v-model="voucherStore.voucher.amount_in_words" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-between">
                    <div class="flex-1">
                        <label for="expenseAccount" class="block text-sm font-medium text-gray-900 dark:text-white">Expense Account</label>
                        <AccountingSelectSearch
                            id="expenseAccount"
                            class="z-50 bg-gray-50 border-gray-200"
                            :options="accountGroupStore.accountGroup.accounts"
                            :selected-id="voucherStore.voucher.account_id"
                            title="account_name"
                            opid="id"
                            @select="voucherStore.voucher.account_id = $event.id"
                        />
                    </div>
                    <div class="flex-1 gap-2" />
                </div>
            </div>
            <form action="">
                <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                    <h2 class="text-center font-bold text-gray-800">
                        ACCOUNTING ENTRIES
                    </h2>
                    <div class="flex flex-col w-full gap-2 mt-4">
                        <div v-for="ac,i in voucherStore.voucher.details" :key="i" class="flex gap-1 w-full items-end">
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Accounts</label>
                                <AccountingSelectSearch
                                    id="expenseAccount"
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
                    <i v-if="voucherStore.voucher.details.length === 0" class="text-center block mt-4 mb-2 text-gray-500">
                        There are no entries yet.
                    </i>
                    <div v-if="voucherStore.voucher.details.length > 0" class="flex justify-left w-full mt-1">
>>>>>>> 75722efe (Voucher ui revamp with fx)
                        <button
                            type="submit"
                            class="text-white p-2 px-4 rounded bg-teal-600 content-center mt-5 rounded-md w-fit"
                        >
                            Add line
                        </button>
                    </div>
                </form>
                <div class="flex flex-col bg-gray-100 rounded-lg px-8 py-4 gap-2">
                    <div v-for="ae,i in accountEntries" :key="i" class="flex gap-2">
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Accounts</label>
                            <!-- <AccountingSelectSearch
                                class="bg-gray-100"
                                :options="accountGroup.accountGroup.accounts"
                                title="account_name"
                                opid="id"
                                height="h-30"
                                fz="text-sm"
                                :selected-id="ae.account_id"
                                @select="ae.account_id = $event.id"
                            /> -->
                            <select v-model="ae.account_id" class="w-full rounded-lg h-9 text-sm bg-gray-100">
                                <option v-for="account in accountsList" :key="account.id" :value="account.id">
                                    {{ account.account_name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Project/Section Code</label>
                            <select v-model="ae.project_id" class="w-full rounded-lg h-9 text-sm bg-gray-100">
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
                        <button
                            class="text-white p-2 px-4 rounded bg-red-500 content-center mt-5 rounded-md w-fit"
                            @click.prevent="removeLine(ae)"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <span v-if="accountEntries.length === 0" class="block text-center text-gray-600">
                    No entries yet.
                </span>
            </div>
            <div class="flex justify-end">
                <div class="flex gap-2 jus">
                    <NuxtLink
                        to="/accounting/voucher/disbursement"
                        class="text-white p-2 px-6 rounded bg-gray-600 content-center mt-5 rounded-md w-fit"
                    >
                        <span>Back</span>
                    </NuxtLink>
                    <button
                        type="submit"
                        class="text-white p-2 px-4 rounded bg-teal-600 content-center mt-5 rounded-md w-fit"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>
<style>

</style>
