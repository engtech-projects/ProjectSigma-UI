<script setup lang="ts">
const { data: userData } = useAuth()
const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})

const totalDebit = computed(() => {
    let total = 0
    props.data.details.forEach((d:Number) => {
        total += parseFloat(d?.debit)
    })
    return total
})

const totalCredit = computed(() => {
    let total = 0
    props.data.details.forEach((d:Number) => {
        total += parseFloat(d?.credit)
    })
    return total
})
</script>

<template>
    <div id="toPrint" class="bg-white left-0 top-0 w-screen min-h-[1000px] max-w-[100%] p-12">
        <div class="flex flex-col gap-2 pb-24 pt-8 relative border-2 border-black min-h-[1200px]">
            <AccountingCommonEvenparHeader class="pb-4 border-b-4 border-green-400 mb-16" />
            <h1 class="text-2xl text-center font-bold text-block border-b-2 pb-2 border-black">
                DISBURSEMENT VOUCHER
            </h1>
            <div class="flex flex-col gap-2">
                <div class="flex justify-end gap-4 mb-4 my-4">
                    <h3 class="font-bold">
                        REFERENCE NO.
                    </h3>
                    <span class="border-b-2 border-gray-800">
                        {{ props.data?.reference_no }}
                    </span>
                </div>
                <table class="border border-black">
                    <tbody>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                PAYEE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ data.payment_request?.stakeholder?.name }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                ENCODED DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ dateToString(new Date(data.date_encoded)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                PARTICULARS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ data.particulars }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                ENTRY DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ dateToString(new Date(data.voucher_date)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                AMOUNT IN WORDS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ data.amount_in_words }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm bg-blue-300">
                                NET AMOUNT
                            </td>
                            <td class="border border-black pl-2 py-1 text-sm">
                                {{ formatToCurrency(data.net_amount) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col gap-4 h-full">
                <div class="flex flex-col">
                    <h2 class="text-2xl text-center font-bold my-4 mb-6">
                        ACCOUNTING ENTRIES
                    </h2>
                    <div class="flex-1 mb-16">
                        <table v-if="props.data.details.length > 0" class="w-full">
                            <thead>
                                <tr>
                                    <th class="border border-gray-800 font-normal text-sm">
                                        ACCOUNT CODE
                                    </th>
                                    <th class="border border-gray-800 font-normal text-sm w-1/3">
                                        ACCOUNT NAME
                                    </th>
                                    <th class="border border-gray-800 font-normal text-sm">
                                        PROJECT/SECTION CODE
                                    </th>
                                    <th class="border border-gray-800 font-normal text-sm w-24">
                                        DEBIT
                                    </th>
                                    <th class="border border-black border-b-gray-800 font-normal text-sm w-24">
                                        CREDIT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ae,i in props.data.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                                    <td class="border px-4 py-1 border-gray-800 text-sm relative">
                                        {{ ae.account?.account_number }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.account?.account_name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.account?.stakeholder?.name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800  text-sm">
                                        {{ ae.debit > 0 ? formatToCurrency(ae.debit) : "" }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 border-y-gray-800 text-sm">
                                        {{ ae.credit > 0 ? formatToCurrency(ae.credit) : "" }}
                                    </td>
                                </tr>
                                <tr class="border-none">
                                    <td colspan="3" class="py-2 px-4 text-right pr-24">
                                        TOTAL
                                    </td>
                                    <td class="border-b-2 border-black py-2 px-4">
                                        {{ formatToCurrency(totalDebit) }}
                                    </td>
                                    <td class="border-b-2 border-black py-2 px-4">
                                        {{ formatToCurrency(totalCredit) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span v-if="props.data.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                    <HrmsReportsSignaturesRow>
                        <FormSignatory
                            label="PREPARED BY"
                            :signatory="{
                                name: userData?.employee.fullname_last,
                                title: 'Accounting Specialist'
                            }"
                        />
                        <FormSignatory
                            label="REVIEWED BY"
                            :signatory="{
                                name: 'DARREN GRACE P. ROSAL',
                                title: 'Accounting Section Head'
                            }"
                        />
                        <FormSignatory
                            label="APPROVED BY"
                            :signatories="[
                                {
                                    name: 'ANGEL A. ABRAU',
                                    title: 'President'
                                }
                            ]"
                        />
                    </HrmsReportsSignaturesRow>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flex-2 {
    flex: 2;
}
.flex-3 {
    flex: 3;
}
</style>
