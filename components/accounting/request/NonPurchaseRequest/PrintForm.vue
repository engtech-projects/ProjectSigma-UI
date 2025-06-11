<script setup lang="ts">
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
const { data: userData } = useAuth()
const paymentRequestStore = usePaymentRequestStore()

const props = defineProps({
    data: {
        type: Object,
        default: null
    }
})

const totalCost = computed(() => {
    let total = 0
    props.data.details.forEach((d:Number) => {
        total += parseFloat(d?.cost)
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

const totalVat = computed(() => {
    let total = 0
    props.data.details.forEach((d:Number) => {
        total += parseFloat(d?.total_vat_amount)
    })
    return total
})

</script>

<template>
    <div id="toPrint" class="bg-white left-0 top-0 w-screen min-h-[1000px] max-w-[100%] p-4 flex flex-col gap-4">
        <div class="header">
            <AccountingCommonEvenparHeader :document-code="paymentRequestStore.paymentRequest.prf_no" />
        </div>
        <div class="content">
            <h1 id="headText" class="text-2xl text-center font-bold mb-8">
                PAYMENT REQUEST FORM
            </h1>
            <div class="flex flex-col justify-between border-2 border-gray-800 min-h-[600px] py-6">
                <div class="flex flex-col gap-4 h-full">
                    <div class="flex flex-col gap-2 mb-10">
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
                                    <tr v-for="ae,i in props.data.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                                        <td class="border px-4 py-1 border-gray-800 text-xs relative">
                                            {{ ae.particulars }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800 text-xs">
                                            {{ ae.stakeholder?.name }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800 text-xs">
                                            {{ ae.cost > 0 ? formatToCurrency(ae.cost) : "-" }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800 text-xs">
                                            {{ ae.total_vat_amount > 0 ? formatToCurrency(ae.total_vat_amount) : "-" }}
                                        </td>
                                        <td class="border px-4 py-1 border-gray-800 border-y-gray-800 text-xs">
                                            {{ ae.amount > 0 ? formatToCurrency(ae.amount) : "-" }}
                                        </td>
                                    </tr>
                                    <tr v-for="j in (10 - props.data.details.length) " :key="j" class="hover:bg-gray-100 cursor-pointer h-6">
                                        <td class="border px-4 py-1 border-gray-800 text-xs relative" />
                                        <td class="border px-4 py-1 border-gray-800 text-xs" />
                                        <td class="border px-4 py-1 border-gray-800 text-xs" />
                                        <td class="border px-4 py-1 border-gray-800 text-xs" />
                                        <td class="border px-4 py-1 font-bold border-gray-800 border-y-gray-800 text-xs" />
                                    </tr>
                                    <tr class="border-2 border-black">
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
                        :signatories="approvals"
                    />
                    <FormSignatory
                        label="RECEIVED BY"
                        :signatory="{
                            name: userData?.employee?.fullname_last,
                            title: ''
                        }"
                    />
                </HrmsReportsSignaturesRow>
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
@page {
    size: auto;
    padding: 24px;
}
@media print {
    #headText {
        padding-top: 120px
    }
}
</style>
