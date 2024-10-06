<script lang="ts" setup>
import { useAccountStore } from "~/stores/accounting/account"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useVoucherStore } from "~/stores/accounting/voucher"

const { list: accountsList } = storeToRefs(useAccountStore())
const { list: payeeList } = storeToRefs(useStakeholderStore())
const voucherStore = useVoucherStore()
const snackbar = useSnackbar()

const loading = ref(false)
const showNetAmount = ref(true)
const amountElement = ref()
const accountEntry = ref({
    account_id: null,
    account_code: null,
    account_name: null,
    project_id: null,
    project_code: null,
    debit: 0,
    credit: 0
})
async function handleSubmit () {
    try {
        loading.value = true
        voucherStore.voucher.line_items = lineItems.value
        voucherStore.voucher.payee = payeeName.value
        voucherStore.voucher.voucher_no = "AJE-202402-0569" + Math.floor(Math.random() * 20000) + 1
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
            navigateTo("/accounting/voucher")
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
const payeeName = computed(() => {
    return payeeList.value.filter(p => voucherStore.voucher.payee === p.stakeholder_id)[0].display_name
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
            contact: "Sample",
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
onMounted(() => {
    voucherStore.voucher.voucher_date = dateToString(new Date())
    voucherStore.voucher.date_encoded = dateToString(new Date())
})
</script>
<template>
    <form @submit.prevent="handleSubmit">
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
                CASH VOUCHER
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
                <div class="flex flex-col gap-12 sm:flex-row">
                    <div class="flex flex-col flex-1 gap-2">
                        <div class="flex-1">
                            <label
                                for="payee"
                                class="text-xs italic"
                            >Payee</label>
                            <select v-model="voucherStore.voucher.payee" class="w-full rounded-lg">
                                <option v-for="st in payeeList" :key="st.stakeholder_id" :value="st.stakeholder_id">
                                    {{ st.display_name }}
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
                    </div>
                    <div class="flex flex-col flex-1">
                        <div class="flex-1">
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
                        <div class="flex-1">
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
                        <!-- <div class="flex-1">
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
                        </div> -->
                        <div class="flex-1">
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
                            <select v-model="ae.account_id" class="w-full rounded-lg h-9 text-sm bg-gray-100">
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
                            <select v-model="ae.project_id" class="w-full rounded-lg h-9 text-sm bg-gray-100">
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
                <!-- <table v-if="accountEntries.length > 0" class="w-full">
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
                    </tbody>
                </table> -->
                <span v-if="accountEntries.length === 0" class="block text-center text-gray-600">
                    No entries yet.
                </span>
            </div>
            <!-- <div class="flex gap-24">
                <span class="border-b-2 border-black pb-16 font-bold flex-1">
                    REQUESTED BY:
                </span>
                <span class="border-b-2 border-black pb-16 font-bold flex-1">
                    APPROVED BY:
                </span>
                <span class="border-b-2 border-black pb-16 font-bold flex-1">
                    RECEIVED BY:
                </span>
            </div> -->
            <div class="flex justify-end">
                <div class="flex gap-2 jus">
                    <NuxtLink
                        to="/accounting/voucher/cash"
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
