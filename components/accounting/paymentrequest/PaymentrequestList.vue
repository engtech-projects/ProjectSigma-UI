<script setup>
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
const setEdit = (pr) => {
    paymentRequestStore.paymentRequest = pr
    navigateTo("/accounting/payment-request/edit?id=" + pr.id)
}
</script>
<template>
    <div class="flex flex-col items-end gap-4">
        <div class="flex items-center justify-end gap-4 w-full">
            <!-- <Icon name="file-icons:microsoft-excel" class="text-2xl cursor-pointer text-gray-500 hover:text-gray-700" @click="downloadCSV" /> -->
            <NuxtLink
                to="/accounting/payment-request/create"
                class="text-white p-2 rounded bg-teal-600 content-center text-center px-4 flex items-center hover:bg-teal-700 active:bg-teal-600"
            >
                <Icon name="fa:plus-circle" class="mr-2 mt-[3px]" />
                <span>New Payment Request</span>
            </NuxtLink>
        </div>
        <LayoutBoards title="List of Vouchers" class="w-full" :loading="paymentRequestStore.isLoading">
            <div class="pb-2 text-gray-500">
                <table id="voucherTable" class="table-auto w-full border-collapse">
                    <thead>
                        <tr class="text-left">
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
                        <tr v-for="pr, i in paymentRequestStore.list" :key="i" class="border text-left">
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
                            <!-- <NuxtLink :to="'/accounting/voucher/disbursement/details?id=' + voucher.id">
                                <Icon name="material-symbols:visibility-rounded" color="white" class="bg-green-500 rounded h-8 w-8 p-1 " />
                            </NuxtLink> -->
                            <td class="text-right">
                                <button @click="setEdit(pr)">
                                    <Icon name="material-symbols:edit" color="white" class="bg-green-400 rounded h-8 w-8 p-1" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </LayoutBoards>
    </div>
</template>

<style scoped>
    #listTable tbody tr td, #listTable thead th {
        text-align: left!important
    }
</style>
