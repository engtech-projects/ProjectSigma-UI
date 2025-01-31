<script setup lang="ts">
const { data: userData } = useAuth()
const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})

const totalCost = computed(() => {
    let total = 0
    detailsData.value.forEach((d:Number) => {
        total += parseFloat(d?.cost)
    })
    return total
})

const approvals = computed(() => {
    const sigs: any[] = []
    props.data.approvals.forEach((d: { employee_name: any; employee_position: any; employee_signature: any }) => {
        const data = {
            name: d?.employee_name,
            title: d?.employee_position,
            signature: d?.employee_signature
        }
        sigs.push(data)
    })
    return sigs
})

const totalVat = computed(() => {
    let total = 0
    detailsData.value.forEach((d:Number) => {
        total += parseFloat(d?.total_vat_amount)
    })
    return total
})

const detailsData = computed(() => {
    return props.data.details
})

const numPages = computed(() => {
    const pages = chunkArray(detailsData.value, 15)
    return pages
})

function chunkArray (array: string | any[], chunkSize: number) {
    const result = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const extraRows = computed(() => {
    return detailsData.value.length > 15 ? 0 : 15 - detailsData.value.length
})

</script>

<template>
    <div class="flex flex-col gap-4 h-full p-4">
        <div v-for="page,i in numPages" :key="i" class="flex flex-col min-h-[1000px] gap-10 min-w-[800px]">
            <AccountingCommonEvenparHeader :page="{currentPage: i+1, totalPages: numPages.length}" />
            <h1 v-if="i === 0" id="headText" class="text-2xl text-center font-bold mb-6">
                PAYMENT REQUEST FORM
            </h1>
            <div class="flex flex-col justify-between border-2 border-gray-800 flex-1 py-6 w-[800px]">
                <div class="flex flex-col gap-4 h-full">
                    <div v-if="i === 0" class="flex flex-col gap-2 mb-10">
                        <div class="flex gap-24 !text-xs">
                            <div class="flex flex-between flex-2 gap-6">
                                <div class="flex justify-between flex-1 items-center">
                                    <span class="flex-1 font-bold">
                                        PAYEE
                                    </span>
                                    <span>
                                        :
                                    </span>
                                </div>
                                <span class="flex-3 border-b-2 border-gray-700">
                                    {{ props.data.stakeholder ? props.data.stakeholder.name : '' }}
                                </span>
                            </div>
                            <div class="flex flex-between items-end flex-1 gap-6">
                                <div class="flex justify-between flex-1">
                                    <span class="flex-1 font-bold">
                                        DATE
                                    </span>
                                    <span>
                                        :
                                    </span>
                                </div>
                                <span class="flex-3 border-b-2 border-gray-700">
                                    {{ dateToString(new Date(props.data.request_date)) }}
                                </span>
                            </div>
                        </div>
                        <div class="flex gap-24">
                            <div class="flex flex-between flex-2 gap-6 items-end">
                                <div class="flex justify-between flex-1 items-center">
                                    <span class="flex-1 font-bold text-xs">
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
                    <div class="flex flex-col">
                        <div class="flex-1 mb-16">
                            <table v-if="props.data.details.length > 0" class="w-full !text-xs">
                                <thead>
                                    <tr>
                                        <th class="border-2 border-gray-800 text-xs">
                                            PARTICULARS
                                        </th>
                                        <th class="border-2 border-gray-800 text-xs w-1/3">
                                            PROJECT/SECTION CODE
                                        </th>
                                        <th class="border-2 border-gray-800 text-xs">
                                            COST
                                        </th>
                                        <th class="border-2 border-gray-800 text-xs w-24">
                                            VAT
                                        </th>
                                        <th class="border-2 border-black border-b-gray-800 text-xs w-24">
                                            TOTAL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="ae,i in page" :key="i" class="hover:bg-gray-100 cursor-pointer">
                                        <td class="border px-4 py-1 border-gray-800 text-xs relative">
                                            {{ ae.particulars }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800 text-xs">
                                            {{ ae.stakeholder?.name }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800 text-xs">
                                            {{ formatToCurrency(ae.cost) }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800  text-xs">
                                            {{ formatToCurrency(ae.total_vat_amount) }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800 border-y-gray-800 text-xs">
                                            {{ formatToCurrency(ae.amount) }}
                                        </td>
                                    </tr>
                                    <tr v-for="j in extraRows" :key="j" class="hover:bg-gray-100 cursor-pointer h-6">
                                        <td class="border px-4 py-1 border-gray-800 text-xs relative" />
                                        <td class="border px-4 py-1 border-gray-800 text-xs" />
                                        <td class="border px-4 py-1 border-gray-800 text-xs" />
                                        <td class="border px-4 py-1 border-gray-800  text-xs" />
                                        <td class="border px-4 py-1 font-bold border-gray-800 border-y-gray-800 text-xs" />
                                    </tr>
                                    <tr v-if="i === numPages.length - 1" class="border-2 border-black">
                                        <td />
                                        <td class="text-center border-2 border-black font-bold py-1">
                                            TOTAL
                                        </td>
                                        <td class="border-2 border-black font-bold py-1 px-4">
                                            {{ formatToCurrency(totalCost) }}
                                        </td>
                                        <td class="border-2 border-black font-bold py-1 px-4">
                                            {{ formatToCurrency(totalVat) }}
                                        </td>
                                        <td class="border-2 border-black font-bold py-1 px-4">
                                            {{ formatToCurrency(parseFloat(props.data.total)) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <span v-if="props.data.details.length === 0" class="block text-center text-gray-600">
                                No entries yet.
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex justify-around">
                    <FormSignatory
                        label="REQUESTED BY"
                        :signatory="{
                            name: props.data.created_by_user,
                            title: ''
                        }"
                    />
                    <FormSignatory
                        label="APPROVED BY"
                        :signatories="approvals"
                    />
                    <FormSignatory
                        label="RECEIVED BY"
                        :signatory="{
                            name: userData?.employee?.fullname_last,
                            title: ''
                        }"
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
@media print {
    .page-break {
    page-break-before: always; /* Ensures content starts on a new page */
    break-before: page; /* Modern browsers */
    }
}
@page {
    size: letter;
    padding: 16px;
    width: 100%!important;
}
</style>
