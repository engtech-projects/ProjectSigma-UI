<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useVoucherStore } from "~/stores/accounting/voucher"

const stakeholderStore = useStakeholderStore()
const accountGroupStore = useAccountGroupStore()
const voucherStore = useVoucherStore()

const emit = defineEmits(["create", "edit"])

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
}

const navigate = (url = "", action = "", voucher = null) => {
    history.pushState(null, "", url)
    if (voucher) {
        voucherStore.voucher = voucher
    }
    emit(action)
}
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
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Payee</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ voucherStore.voucher.stakeholder?.name }}
                    </h4>
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
                    <label class="block text-xs text-gray-900 dark:text-white">Account</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ voucherStore.voucher.account?.account_name }}
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
        <div class="flex justify-between w-full mb-8 gap-2 items-center mt-5">
            <button
                class="text-gray-700 self-start hover:text-blue-500 border-gray-700 mt-2"
                @click.prevent="navigate('/accounting/voucher/disbursement', 'create')"
            >
                <Icon name="ion:ios-arrow-thin-left" class="mr-1 text-2xl" />
                Back to create
            </button>
            <div class="flex gap-2">
                <button
                    class="text-white p-2 px-6 bg-orange-600 content-center rounded-md w-fit flex items-center"
                    @click="print"
                >
                    <Icon name="iconoir:printing-page" class="text-xl mr-2" />
                    Print
                </button>
                <button
                    class="text-white p-2 px-6 bg-teal-600 content-center rounded-md w-fit flex items-center"
                    @click="navigate('/accounting/voucher/disbursement?edit=' + voucherStore.voucher.id, 'edit')"
                >
                    <Icon name="iconoir:edit" class="text-xl mr-2" />
                    Edit
                </button>
            </div>
        </div>

        <!-- PRINT AREA  -->

        <div class="hidden">
            <AccountingVoucherDisbursementPrint />
        </div>
    </div>
</template>
<style scoped>
</style>
