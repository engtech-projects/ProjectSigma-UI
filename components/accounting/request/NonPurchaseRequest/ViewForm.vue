<script setup>
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
const paymentRequestStore = usePaymentRequestStore()
const { paymentRequest } = storeToRefs(paymentRequestStore)

defineProps({
    paymentData: {
        type: Object,
        required: false,
        default: null
    }
})
</script>

<template>
    <LayoutBoards title="Payment Request Form (Non-Purchase)" :loading="paymentRequest.isLoading" class="w-90">
        <div>
            <div class="flex flex-col gap-16 pt-8">
                <h1 class="text-2xl text-center font-bold">
                    PAYMENT REQUEST FORM
                </h1>
                <div class="w-full">
                    <div class="flex gap-2">
                        <div class="w-full">
                            <label class="text-xs italic">PRF Number</label>
                            <p class="w-full rounded-lg p-2 bg-gray-100">
                                {{ paymentData?.prf_no }}
                            </p>
                        </div>
                        <div class="w-full">
                            <label class="text-xs italic">Total Amount</label>
                            <p class="w-full rounded-lg p-2 bg-gray-100">
                                {{ paymentData?.total }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-xs italic">Payee</label>
                            <p class="w-full rounded-lg p-2 bg-gray-100">
                                {{ paymentData?.stakeholderInformation?.name }}
                            </p>
                        </div>
                        <div>
                            <label class="text-xs italic">Date</label>
                            <p class="w-full rounded-lg p-2 bg-gray-100">
                                {{ paymentData?.request_date }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <div class="w-full">
                            <label class="text-xs italic">Description</label>
                            <p class="w-full rounded-lg p-2 bg-gray-100">
                                {{ paymentData?.description }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <h2 class="text-xl font-bold text-center">
                        PAYMENT REQUEST DETAILS
                    </h2>
                    <div v-show="paymentData?.details.length > 0" class="flex flex-col bg-gray-100 rounded-lg gap-2">
                        <div v-for="ae,i in paymentData?.details" :key="i" class="flex gap-2">
                            <div class="flex-1">
                                <label class="text-xs italic">Particulars</label>
                                <p class="w-full rounded-lg p-2 bg-gray-100">
                                    {{ ae.particulars }}
                                </p>
                            </div>
                            <div class="flex-1">
                                <label class="text-xs italic">Project/Section Code</label>
                                <p class="w-full rounded-lg p-2 bg-gray-100">
                                    {{ ae.stakeholderInformation?.name }}
                                </p>
                            </div>
                            <div class="flex-1">
                                <label class="text-xs italic">Cost</label>
                                <p class="w-full rounded-lg p-2 bg-gray-100">
                                    {{ ae.cost }}
                                </p>
                            </div>
                            <div class="flex-1">
                                <label class="text-xs italic">Vat %</label>
                                <p class="w-full rounded-lg p-2 bg-gray-100">
                                    {{ ae.vat }}
                                </p>
                            </div>
                            <div class="flex-1">
                                <label class="text-xs italic">Amount</label>
                                <p class="w-full rounded-lg p-2 bg-gray-100">
                                    {{ Number(ae.cost) + Number(ae.vat) }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <span v-if="paymentData?.details.length === 0" class="block text-center text-gray-600">
                        No entries yet.
                    </span>
                </div>
                <div class="w-full">
                    <HrmsCommonRequestedBy disabled />
                    <label class="block text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                    <div>
                        <HrmsSetupApprovalsList
                            v-for="(approv, apr) in paymentData?.approvals"
                            :key="'hrmsetupapprovallist'+apr"
                        />
                    </div>
                </div>
            </div>
        </div>
    </LayoutBoards>
</template>
