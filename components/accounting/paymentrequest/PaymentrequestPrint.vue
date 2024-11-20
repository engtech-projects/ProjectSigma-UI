<script setup>
import { usePaymentRequestStore } from "~/stores/accounting/requests/paymentrequest"
import { useStakeHolderStore } from "~/stores/accounting/setup/stakeholder"

const paymentRequestStore = usePaymentRequestStore()
const stakeholderStore = useStakeHolderStore()

const stakeholder = (id) => {
    return stakeholderStore.list.filter(st => st.id === id)[0]
}

const totalCost = computed(() => {
    let amount = 0
    paymentRequestStore.paymentRequest.details.forEach((v) => {
        amount += parseFloat(v.cost)
    })
    return amount
})
const totalVat = computed(() => {
    let amount = 0
    paymentRequestStore.paymentRequest.details.forEach((v) => {
        amount += parseFloat(v.vat)
    })
    return amount
})
</script>
<template>
    <div id="toPrint" class="absolute bg-white left-0 top-0 w-screen min-h-[1000px] z-[99999] p-12">
        <div class="flex flex-col gap-10 pb-24 pt-8 relative">
            <AccountingCommonEvenparHeader />
            <h1 class="text-2xl text-center font-bold">
                PAYMENT REQUEST
            </h1>
            <div class="flex flex-col gap-2">
                <div class="flex justify-end gap-4 mb-4">
                    <h3 class="font-bold">
                        PRF NO.
                    </h3>
                    <span class="border-b border-gray-800">
                        {{ paymentRequestStore.paymentRequest.prf_no }}
                    </span>
                </div>
                <table class="border border-black">
                    <tbody>
                        <tr>
                            <td class="withBg border border-black pl-2 py-1 text-sm bg-blue-300">
                                PAYEE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ paymentRequestStore.paymentRequest.stakeholder ? paymentRequestStore.paymentRequest.stakeholder.name : '' }}
                            </td>
                            <td class="withBg border border-black pl-2 py-1 text-sm bg-blue-300">
                                ENCODED DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ dateToString(new Date(paymentRequestStore.paymentRequest.request_date)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="withBg border border-black pl-2 py-1 text-sm bg-blue-300">
                                DESCRIPTION :
                            </td>
                            <td colspan="3" class="border border-black pl-2 py-1 text-sm">
                                {{ paymentRequestStore.paymentRequest.description }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col gap-4 h-full">
                <div class="flex flex-col">
                    <div class="flex-1 mb-16">
                        <table v-if="paymentRequestStore.paymentRequest.details.length > 0" class="w-full">
                            <thead>
                                <tr>
                                    <th class="border-2 border-gray-800 text-sm">
                                        PARTICULARS
                                    </th>
                                    <th class="border-2 border-gray-800 text-sm w-1/3">
                                        PROJECT/SECTION CODE
                                    </th>
                                    <th class="border-2 border-gray-800 text-sm">
                                        COST
                                    </th>
                                    <th class="border-2 border-gray-800 text-sm w-24">
                                        VAT
                                    </th>
                                    <th class="border-2 border-black border-b-gray-800 text-sm w-24">
                                        TOTAL
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ae,i in paymentRequestStore.paymentRequest.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                                    <td class="border px-4 py-1 border-gray-800 text-sm relative">
                                        {{ ae.particulars }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ stakeholder(ae.stakeholder_id)?.name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.cost }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800  text-sm">
                                        {{ formatToCurrency(ae.vat) }}
                                    </td>
                                    <td class="border-2 px-4 py-1 font-bold border-gray-800 border-y-gray-800 text-sm">
                                        {{ formatToCurrency(parseFloat(ae.cost) + parseFloat(ae.vat)) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td />
                                    <td class="text-center border-2 border-black font-bold py-2">
                                        TOTAL
                                    </td>
                                    <td class="border-2 border-black font-bold py-2 px-4">
                                        {{ formatToCurrency(totalCost) }}
                                    </td>
                                    <td class="border-2 border-black font-bold py-2 px-4">
                                        {{ formatToCurrency(totalVat) }}
                                    </td>
                                    <td class="border-2 border-black font-bold py-2 px-4">
                                        {{ formatToCurrency(parseFloat(totalCost) + parseFloat(totalVat)) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span v-if="paymentRequestStore.paymentRequest.details.length === 0" class="block text-center text-gray-600">
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
<style scoped>
    @media print {
        .no-print {
            display: none!important;
        }
    }
</style>
