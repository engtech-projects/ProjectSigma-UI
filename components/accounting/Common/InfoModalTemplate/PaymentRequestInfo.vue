<script setup>
defineProps({
    paymentData: {
        type: Object,
        default: null
    },
    signatories: {
        type: Object,
        default: null
    }
})
</script>
<template>
    <div v-if="!printPreview" class="px-4">
        <div class="w-3/4">
            <div class="p-2 py-4 flex gap-2 w-full mb-4">
                <span class="text-gray-900 text-4xl text-center w-full block flex-1">Payment Request</span>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">PRF Number: </span>
                    <span class="text-gray-900">{{ paymentData?.prf_no }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Payee: </span>
                    {{ paymentData?.stakeholder?.name }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Amount: </span>
                    {{ accountingCurrency(paymentData?.total) }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Prepared by: </span>
                    {{ paymentData?.created_by_user }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Prepared on: </span>
                    {{ paymentData?.date_filed }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Status: </span>
                    {{ paymentData?.request_status }}
                </div>
            </div>
            <div class="p-2 border border-gray-200 rounded-lg">
                <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                    Payment Request Details
                </h2>
                <div class="overflow-x-auto">
                    <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <table class="min-w-full divide-y border border-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        Particulars
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        Project/Section Code
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        Cost
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        Total Vat
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                        Total Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="detail in paymentData?.details" :key="detail.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-600">
                                            {{ detail?.particulars }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-600">
                                            {{ detail?.stakeholder.name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-600">
                                            {{ accountingCurrency(detail?.cost) }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-600">
                                            {{ accountingCurrency(detail?.total_vat_amount) }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-600">
                                            {{ accountingCurrency(detail?.amount) }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="paymentData?.approvals" />
            </div>
        </div>
        <div class="w-1/4">
            <AccountingCommonTransactionFlow
                :transaction-option="'view'"
                :transaction-flow-model-list="paymentData.transaction_flow"
            />
        </div>
    </div>
</template>
