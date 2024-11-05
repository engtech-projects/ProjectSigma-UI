<template>
    <div id="toPrint" class="absolute bg-white left-0 top-0 w-screen min-h-[1000px] z-[99999] p-12">
        <div class="flex flex-col gap-10 pb-24 pt-8 relative">
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
                <table class="border border-black">
                    <tbody>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                PAYEE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ voucherStore.voucher.stakeholder ? voucherStore.voucher.stakeholder.name : '' }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                ENCODED DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ dateToString(new Date(voucherStore.voucher.date_encoded)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                PARTICULARS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ voucherStore.voucher.particulars }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                ENTRY DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ dateToString(new Date(voucherStore.voucher.voucher_date)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                AMOUNT IN WORDS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ voucherStore.voucher.amount_in_words }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                NET AMOUNT
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ formatToCurrency(voucherStore.voucher.net_amount) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col gap-4 h-full">
                <h2 class="text-xl font-bold text-center mb-4">
                    ACCOUNTING ENTRIES
                </h2>
                <div class="flex flex-col">
                    <div class="flex-1 mb-16">
                        <table v-if="voucherStore.voucher.details.length > 0" class="w-full">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ae,i in voucherStore.voucher.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                                    <td class="border px-4 py-1 border-gray-800 text-sm relative">
                                        {{ account(ae.account_id)?.account_number }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ account(ae.account_id)?.account_name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ stakeholder(ae.stakeholder_id)?.name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ formatToCurrency(ae.debit) }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
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
                        <span v-if="voucherStore.voucher.details.length === 0" class="block text-center text-gray-600">
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
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useVoucherStore } from "~/stores/accounting/voucher"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const voucherStore = useVoucherStore()
const stakeholderStore = useStakeholderStore()
const accountGroupStore = useAccountGroupStore()

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

</script>

<style scoped>
    @media print {
        .no-print {
            display: none!important;
        }
    }
</style>
