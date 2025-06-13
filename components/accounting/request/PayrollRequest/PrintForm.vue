<script setup>
const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})

const totalCost = computed(() => {
    let total = 0
    props.data.details.forEach((d) => {
        total += parseFloat(d?.cost)
    })
    return total
})

const totalVat = computed(() => {
    let total = 0
    props.data.details.forEach((d) => {
        total += parseFloat(d?.total_vat_amount)
    })
    return total
})

</script>

<template>
    <div id="toPrint" class="bg-white left-0 top-0 w-screen min-h-[1000px] max-w-[100%] p-12">
        <div class="flex flex-col gap-10 pb-24 pt-8 relative">
            <AccountingCommonEvenparHeader class="mb-16" />
            <h1 class="text-2xl text-center font-bold">
                PAYMENT REQUEST FORM
            </h1>
            <div class="flex flex-col gap-2">
                <div class="flex justify-end gap-4 mb-4">
                    <h3 class="font-bold">
                        PRF NO.
                    </h3>
                    <span class="border-b border-gray-800">
                        {{ props.data?.prf_no }}
                    </span>
                </div>
                <div class="flex gap-24">
                    <div class="flex flex-between flex-2 gap-6">
                        <div class="flex justify-between flex-1">
                            <span class="flex-1 font-bold">
                                PAYEE
                            </span>
                            <span>
                                :
                            </span>
                        </div>
                        <span class="flex-3 border-b-2 border-gray-700">
                            {{ props.data.stakeholder ? props.data.stakeholder?.name : '' }}
                        </span>
                    </div>
                    <div class="flex flex-between flex-1 gap-6">
                        <div class="flex justify-between flex-1">
                            <span class="flex-1 font-bold">
                                DATE
                            </span>
                            <span>
                                :
                            </span>
                        </div>
                        <span class="flex-3 border-b-2 border-gray-700">
                            {{ dateToString(new Date(props.data?.request_date)) }}
                        </span>
                    </div>
                </div>
                <div class="flex gap-24">
                    <div class="flex flex-between flex-2 gap-6">
                        <div class="flex justify-between flex-1">
                            <span class="flex-1 font-bold">
                                DESCRIPTION
                            </span>
                            <span>
                                :
                            </span>
                        </div>
                        <span class="flex-3 border-b-2 border-gray-700">
                            {{ props.data.description }}
                        </span>
                    </div>
                    <div class="flex flex-between flex-1 gap-6" />
                </div>
            </div>
            <div class="flex flex-col gap-4 h-full">
                <div class="flex flex-col">
                    <div class="flex-1 mb-16">
                        <table v-if="props.data.details.length > 0" class="w-full">
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
                                <tr v-for="ae,i in props.data.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                                    <td class="border px-4 py-1 border-gray-800 text-sm relative">
                                        {{ ae.particulars }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.stakeholder?.name }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.cost > 0 ? formatToCurrency(ae.cost) : "-" }}
                                    </td>
                                    <td class="border px-4 py-1 border-gray-800 text-sm">
                                        {{ ae.total_vat_amount > 0 ? formatToCurrency(ae.total_vat_amount) : "-" }}
                                    </td>
                                    <td class="border-2 px-4 py-1 font-bold border-gray-800 border-y-gray-800 text-sm">
                                        {{ ae.amount > 0 ? formatToCurrency(ae.amount) : "-" }}
                                    </td>
                                </tr>
                                <tr class="border border-black">
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
                                        {{ formatToCurrency(parseFloat(props.data.total)) }}
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
