<script setup>
defineProps({
    voucherData: {
        type: Object,
        default: null
    },
})
</script>
<template>
    <div>
        <div class="p-2 py-4 flex gap-2 w-full">
            <span class="text-gray-900 text-4xl text-center w-full block">Cash Voucher</span>
        </div>
        <div class="grid md:grid-cols-3 gap-2 md:justify-between">
            <div class="p-2 flex gap-2">
                <span class="text-teal-600 text-light">DV Number: </span>
                <span class="text-gray-900">{{ voucherData?.voucher_no }}</span>
            </div>
            <div class="p-2 flex gap-2">
                <span class="text-teal-600 text-light">Check No: </span>
                {{ voucherData?.check_no }}
            </div>
            <div class="p-2 flex gap-2">
                <span class="text-teal-600 text-light">Amount: </span>
                {{ voucherData?.net_amount }}
            </div>
        </div>
        <div class="grid md:grid-cols-3 gap-2 md:justify-between">
            <div class="p-2 flex gap-2">
                <span class="text-teal-600 text-light">Status: </span>
                {{ voucherData?.request_status }}
            </div>
            <div class="p-2 flex gap-2">
                <span class="text-teal-600 text-light">Date Encoded: </span>
                {{ voucherData?.date_encoded }}
            </div>
            <div class="p-2 flex gap-2">
                <span class="text-teal-600 text-light">Voucher Date: </span>
                {{ voucherData?.voucher_date }}
            </div>
        </div>
        <div class="p-2 border border-gray-200 rounded-lg">
            <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                Voucher Details
            </h2>
            <div class="overflow-x-auto">
                <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                    <table class="min-w-full divide-y border border-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Account Name
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Account Number
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Debit
                                </th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Credit
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="detail in voucherData?.details" :key="detail.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        {{ detail?.account?.account_name }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        {{ detail?.account?.account_number }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        {{ detail?.debit }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        {{ detail?.credit }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="w-full">
            <LayoutApprovalsListView :approvals="voucherData?.approvals" />
        </div>
        <div v-if="voucherData?.request_status.toLowerCase() === 'approved' && !voucherData?.received_by && !voucherData?.received_date">
            <div class="w-full">
                <AccountingVoucherCashReceivedForm :voucher-id="voucherData?.id" />
            </div>
        </div>
        <div>
            <div class="w-full">
                <AccountingVoucherCashReceivedView :received-data="voucherData" />
            </div>
        </div>
    </div>
</template>
