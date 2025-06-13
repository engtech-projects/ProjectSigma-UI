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
    detailsData.value.forEach((d:Number) => {
        total += parseFloat(d?.debit)
    })
    return total
})

const totalCredit = computed(() => {
    let total = 0
    detailsData.value.forEach((d:Number) => {
        total += parseFloat(d?.credit)
    })
    return total
})
const approvals = computed(() => {
    const sigs: any[] = []
    props.data.approvals.forEach((d) => {
        const data = {
            name: d?.employee_name,
            title: d?.employee_position,
            signature: d?.employee_signature
        }
        sigs.push(data)
    })
    return sigs
})
const detailsData = computed(() => {
    return props.data.details
})
const extraRows = computed(() => {
    return detailsData.value.length > 12 ? 0 : 12 - detailsData.value.length
})
const numPages = computed(() => {
    const pages = chunkArray(detailsData.value, 12)
    return pages
})

function chunkArray (array: string | any[], chunkSize: number) {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}
</script>

<template>
    <div id="toPrint" class="flex flex-col gap-2 bg-white left-0 top-0 w-screen max-w-[100%] p-2">
        <div v-for="page,i in numPages" :key="i" class="flex flex-col gap-2 pt-8 relative border-2 border-black pb-4 min-h-[1000px]">
            <AccountingCommonEvenparHeader :page="{currentPage: i+1, totalPages: numPages.length}" class="pb-4 border-b-4 border-green-400 mb-8" />
            <h1 v-if="i === 0" id="headText" class="text-2xl text-center font-bold text-block border-b-2 pb-2 border-black">
                DISBURSEMENT VOUCHER
            </h1>
            <div v-if="i === 0" class="flex flex-col gap-2 !text-xs">
                <div class="flex justify-end gap-4 mb-4 my-4">
                    <h3 class="font-bold">
                        REFERENCE NO.
                    </h3>
                    <span class="border-b-2 border-gray-800">
                        {{ props.data?.voucher_no }}
                    </span>
                </div>
                <table class="border border-black">
                    <tbody>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                PAYEE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ data.payment_request?.stakeholder?.name }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                ENCODED DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ dateToString(new Date(data.date_encoded)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                PARTICULARS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ data.particulars }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                ENTRY DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ dateToString(new Date(data.voucher_date)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                AMOUNT IN WORDS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ data.amount_in_words }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                NET AMOUNT
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ accountingCurrency(data.net_amount) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col gap-4 justify-between flex-1">
                <div class="flex flex-col">
                    <h2 class="text-2xl text-center font-bold my-4 mb-6">
                        ACCOUNTING ENTRIES
                    </h2>
                    <div class="flex-1">
                        <table v-if="props.data.details.length > 0" class="w-full">
                            <thead>
                                <tr>
                                    <th class="border border-gray-800 font-normal text-xs">
                                        ACCOUNT CODE
                                    </th>
                                    <th class="border border-gray-800 font-normal text-xs w-1/3">
                                        ACCOUNT NAME
                                    </th>
                                    <th class="border border-gray-800 font-normal text-xs">
                                        PROJECT/SECTION CODE
                                    </th>
                                    <th class="border border-gray-800 font-normal text-xs w-24">
                                        DEBIT
                                    </th>
                                    <th class="border border-black border-b-gray-800 font-normal text-xs w-24">
                                        CREDIT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="ae, index in page" :key="index" class="hover:bg-gray-100 cursor-pointer">
                                    <td class="border px-4 py-1 border-gray-800 text-xs relative">
                                        {{ ae.account?.account_number }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-xs">
                                        {{ ae.account?.account_name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-xs">
                                        {{ ae?.stakeholder?.name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-xs">
                                        {{ ae.debit > 0 ? formatToCurrency(ae.debit) : "-" }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 border-y-gray-800 text-xs">
                                        {{ ae.credit > 0 ? formatToCurrency(ae.credit) : "-" }}
                                    </td>
                                </tr>
                                <tr v-for="index in extraRows" :key="index" class="hover:bg-gray-100 cursor-pointer h-6">
                                    <td class="border px-4 py-1 border-gray-800 text-xs relative" />
                                    <td class="border px-4 py-1 border-gray-800 text-xs" />
                                    <td class="border px-4 py-1 border-gray-800 text-xs" />
                                    <td class="border px-4 py-1 border-gray-800 text-xs" />
                                    <td class="border px-4 py-1 border-gray-800 border-y-gray-800 text-xs" />
                                </tr>
                                <tr class="border-none">
                                    <td colspan="3" class="py-2 px-4 text-right pr-24 text-xs">
                                        TOTAL
                                    </td>
                                    <td class="border-b-2 border-black py-2 px-4 text-xs">
                                        {{ accountingCurrency(totalDebit) }}
                                    </td>
                                    <td class="border-b-2 border-black py-2 px-4 text-xs">
                                        {{ accountingCurrency(totalCredit) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span v-if="props.data.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                </div>
                <div v-if="i === numPages.length - 1" class="flex justify-around">
                    <FormSignatory
                        label="PREPARED BY"
                        :signatory="{
                            name: props.data.payment_request?.created_by_user,
                            title: ''
                        }"
                    />
                    <FormSignatory
                        label="REVIEWED BY"
                        :signatory="{
                            name: userData?.employee?.fullname_last,
                            title: 'Accounting Specialist'
                        }"
                    />
                    <FormSignatory
                        label="APPROVED BY"
                        :signatories="approvals"
                    />
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
