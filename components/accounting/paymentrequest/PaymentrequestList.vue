<script setup>
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
const emit = defineEmits(["view-details"])

const navigate = (url = "", action = "", pr = null) => {
    history.pushState(null, "", url)
    if (pr) {
        // paymentRequestStore.paymentRequest = pr
        paymentRequestStore.getPaymentRequest(pr.id)
    }
    emit(action)
}
</script>
<template>
    <div class="pb-2 text-gray-500">
        <div v-if="paymentRequestStore.isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <table id="prfTable" class="table-auto w-full border-collapse">
            <thead>
                <tr class="text-left !text-sm">
                    <th class="p-2 ">
                        PRF No.
                    </th>
                    <th class="p-2">
                        Date Created
                    </th>
                    <th class="p-2">
                        Payee
                    </th>
                    <th class="p-2">
                        Total Amount
                    </th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <tr v-for="pr, i in paymentRequestStore.list" :key="i" class="border text-left !text-sm !text-black">
                    <td class="p-2">
                        {{ pr.prf_no }}
                    </td>
                    <td class="p-2">
                        {{ useUtilities().value.dateToString(new Date(pr.request_date)) }}
                    </td>
                    <td class="p-2">
                        {{ pr.stakeholder.name }}
                    </td>
                    <td class="p-2">
                        {{ useUtilities().value.formatCurrency(pr.total) }}
                    </td>
                    <td class="text-right">
                        <Icon
                            name="material-symbols:visibility-rounded"
                            color="white"
                            class="bg-green-500 hover:bg-green-600 active:bg-green-700 rounded h-8 w-8 p-1 cursor-pointer"
                            @click="navigate('/accounting/payment-request?details=' + pr.id, 'view-details', pr)"
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important
    }
</style>
