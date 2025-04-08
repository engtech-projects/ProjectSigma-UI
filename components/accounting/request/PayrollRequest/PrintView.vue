<script setup lang="ts">

const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})

const detailsData = computed(() => {
    return props.data.details
})
// const extraRows = computed(() => {
//     return detailsData.value.length > 12 ? 0 : 12 - detailsData.value.length
// })
const totalCost = computed(() => {
    let total = 0
    detailsData.value.forEach((d:Number) => {
        total += parseFloat(d?.cost)
    })
    return total
})

const totalVat = computed(() => {
    let total = 0
    detailsData.value.forEach((d:Number) => {
        total += parseFloat(d?.total_vat_amount)
    })
    return total
})

const numPages = computed(() => {
    const pages = chunkArray(detailsData.value, 15, 23)
    return pages
})

// function chunkArray (array: string | any[], chunkSize: number) {
//     const result = []
//     for (let i = 0; i < array.length; i += chunkSize) {
//         result.push(array.slice(i, i + chunkSize))
//     }
//     return result
// }
function chunkArray<T> (array: T[], firstChunkSize: number, chunkSize: number): T[][] {
    if (!array.length || firstChunkSize <= 0 || chunkSize <= 0) { return [] }

    const result: T[][] = []

    // If the first chunk size is greater than or equal to the array, return the whole array as one chunk
    if (firstChunkSize >= array.length) {
        return [array]
    }

    // Extract the first chunk
    result.push(array.slice(0, firstChunkSize))

    // Extract the remaining chunks
    for (let i = firstChunkSize; i < array.length; i += chunkSize) {
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
                PAYROLL VOUCHER
            </h1>
            <div v-if="i === 0" class="flex flex-col gap-2 !text-xs pt-12">
                <table class="border border-black">
                    <tbody>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                PAYEE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ data?.stakeholder?.name }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                ENCODED DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ data?.date_filed }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                PARTICULARS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ data.description }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                ENTRY DATE :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ useFullDateTime(new Date(data?.request_date)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                AMOUNT IN WORDS :
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ amountToWords(data?.total) }}
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs bg-blue-300">
                                NET AMOUNT
                            </td>
                            <td class="border border-black pl-2 py-1 text-xs">
                                {{ accountingCurrency(data?.total) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex flex-col gap-4 h-full pt-12">
                <div class="flex flex-col">
                    <div class="flex-1 mb-16">
                        <table v-if="props.data.details.length > 0" class="w-full border-collapse">
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
                                <tr v-for="ae,index in page" :key="index" class="hover:bg-gray-100 cursor-pointer">
                                    <td class="border px-4 py-1 border-gray-800 text-sm relative">
                                        {{ ae.particulars }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.stakeholder?.name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.cost > 0 ? formatToCurrency(ae.cost) : "-" }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800  text-sm">
                                        {{ ae.total_vat_amount > 0 ? formatToCurrency(ae.total_vat_amount) : "-" }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 border-y-gray-800 text-sm">
                                        {{ ae.amount > 0 ? formatToCurrency(ae.amount) : "-" }}
                                    </td>
                                </tr>
                                <tr v-if="i === numPages.length - 1" class="border border-black">
                                    <td />
                                    <td class="text-center border border-black py-2">
                                        TOTAL
                                    </td>
                                    <td class="border border-black py-2 px-4">
                                        {{ accountingCurrency(totalCost) }}
                                    </td>
                                    <td class="border border-black py-2 px-4">
                                        {{ accountingCurrency(totalVat) }}
                                    </td>
                                    <td class="border border-black py-2 px-4">
                                        {{ accountingCurrency(parseFloat(props.data.total)) }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span v-if="props.data.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                    <HrmsReportsSignaturesRow v-if="i === numPages.length - 1">
                        <FormSignatory
                            label="REQUESTED BY"
                            :signatory="{
                                name: props.data.created_by_user,
                                title: ''
                            }"
                        />
                        <FormSignatory
                            label="APPROVED BY"
                            :signatories="[
                                {
                                    name: 'RICHE C. DALAUTA',
                                    title: 'Director'
                                },
                                {
                                    name: 'ANGEL A. ABRAU',
                                    title: 'President'
                                }
                            ]"
                        />
                        <FormSignatory
                            label="RECEIVED BY"
                            :signatory="{
                                name: '',
                                title: ''
                            }"
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
