<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useVoucherStore } from "~/stores/accounting/voucher"

const stakeholderStore = useStakeholderStore()
const accountGroupStore = useAccountGroupStore()
const voucherStore = useVoucherStore()

const loading = ref(false)
const account = (id) => {
    return accountGroupStore.accountGroup.accounts.filter(a => a.id === id)[0]
}
const stakeholder = (id) => {
    return stakeholderStore.list.filter(st => st.id === id)[0]
}
const totalDebit = computed(() => {
    let amount = 0
    voucherStore.voucher.details.forEach((v) => {
        amount += parseFloat(v.debit)
    })
    return amount
})
const totalCredit = computed(() => {
    let amount = 0
    voucherStore.voucher.details.forEach((v) => {
        amount += parseFloat(v.credit)
    })
    return amount
})
function print () {
    const divToPrint = document.getElementById("toPrint")
    const tailwindCSSUrl = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"

    const printWindow = window.open("", "_blank", `width=${screen.width},height=${screen.height}`)
    const htmlString = `<html><head><link href='${tailwindCSSUrl}' rel='stylesheet'></head><body>${divToPrint.outerHTML}</body></html>`

    printWindow.document.write(htmlString)
    printWindow.document.close()

    printWindow.onload = function () {
        printWindow.focus()
        printWindow.print()
    }
<<<<<<< HEAD
})
const accountEntries = ref([])
const accountId = computed(() => {
    return voucherStore.voucher ? voucherStore.voucher.account_id : null
})
// const print = () => {
//     toPrint.value = true
//     setTimeout(window.print, 500)
// }
onMounted(() => {
    // console.log(accountId.value)
    accountEntries.value = voucherStore.voucher.details
})
=======
}
>>>>>>> 75722efe (Voucher ui revamp with fx)
</script>
<template>
    <div class="bg-white shadow rounded-lg border border-gray-200 px-2">
        <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div class="flex justify-between items-center h-16 border-b px-4">
            <h2 class="text-xl text-gray-800">
                Disbursement Voucher Details
            </h2>
        </div>
        <div class="flex flex-col p-4 w-full">
            <div class="flex gap-4 border-b py-4 w-full">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Reference No.</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ voucherStore.voucher.voucher_no }}
                    </h4>
                </div>
<<<<<<< HEAD
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
                            <select v-model="accountId" class="w-full rounded-lg" disabled>
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
=======
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Payee</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ voucherStore.voucher.stakeholder?.name }}
                    </h4>
>>>>>>> 75722efe (Voucher ui revamp with fx)
                </div>
            </div>
            <div class="flex gap-4 border-b py-4 w-full">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Encoded Date</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ fullDate(voucherStore.voucher.date_encoded) }}
                    </h4>
                </div>
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Voucher Date</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ fullDate(voucherStore.voucher.voucher_date) }}
                    </h4>
                </div>
            </div>
            <div class="flex gap-4 border-b py-4 w-full">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Net Amount</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ formatToCurrency(voucherStore.voucher.net_amount) }}
                    </h4>
                </div>
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Amount in Words</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ voucherStore.voucher.amount_in_words }}
                    </h4>
                </div>
            </div>
            <div class="flex gap-2 w-full justify-between py-4">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Expense Account</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ voucherStore.voucher.account?.account_name }}
                    </h4>
                </div>
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Check No.</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ voucherStore.voucher.check_no }}
                    </h4>
                </div>
            </div>
        </div>
        <form action="">
            <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                <h2 class="text-center font-bold text-gray-800">
                    ACCOUNTING ENTRIES
                </h2>
                <table v-if="voucherStore.voucher.details.length > 0" class="w-full mt-6">
                    <thead>
                        <tr>
                            <th class="border-2 border-gray-800 text-xs">
                                ACCOUNT CODE
                            </th>
                            <th class="border-2 border-gray-800 text-xs w-1/3">
                                ACCOUNT NAME
                            </th>
                            <th class="border-2 border-gray-800 text-xs">
                                PROJECT/SECTION CODE
                            </th>
                            <th class="border-2 border-gray-800 text-xs w-24">
                                DEBIT
                            </th>
                            <th class="border-2 border-gray-800 text-xs w-24">
                                CREDIT
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ae,i in voucherStore.voucher.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                            <td class="border px-4 py-1 border-gray-800 text-xs relative">
                                {{ account(ae.account_id).account_number }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ account(ae.account_id).account_name }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ stakeholder(ae.stakeholder_id).name }}
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
                <i v-if="voucherStore.voucher.details.length === 0" class="text-center block mt-4 mb-2 text-gray-500">
                    There are no entries yet.
                </i>
            </div>
        </form>
        <div class="flex justify-end w-full mb-8 gap-2">
            <button
                class="text-white p-2 px-6 bg-orange-600 content-center mt-5 rounded-md w-fit"
                @click="print"
            >
                Print
            </button>
            <button
                class="text-white p-2 px-6 bg-teal-600 content-center mt-5 rounded-md w-fit"
            >
                Edit
            </button>
        </div>

        <!-- PRINT AREA  -->

        <div class="hidden">
            <AccountingVoucherDisbursementPrint />
        </div>
    </div>
</template>
<style scoped>
</style>
