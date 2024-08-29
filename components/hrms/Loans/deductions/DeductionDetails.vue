<script lang="ts" setup>
import { useOtherDeductionStore } from "@/stores/hrms/loansAndCash/otherDeduction"
const otherDeductionStore = useOtherDeductionStore()
const { paymentData } = storeToRefs(otherDeductionStore)
const props = defineProps({
    data: {
        type: Object,
        required: true,
    }
})
const emit = defineEmits(["closeModal"])
const snackbar = useSnackbar()
const showPaymentForm = ref(false)
const submitPayment = async () => {
    try {
        await otherDeductionStore.submitPayment(props.data.id)
        snackbar.add({
            type: "success",
            text: paymentData.value.successMessage
        })
        emit("closeModal")
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error
        })
    }
}
const cancelPayment = () => {
    paymentData.value.data.paymentAmount = 0
    showPaymentForm.value = false
}
const showMakePayment = () => {
    showPaymentForm.value = true
}
</script>
<template>
    <div v-if="!showPaymentForm" class="flex flex-col gap-2">
        <div class="flex gap-4">
            <div class="flex flex-1 flex-col gap-1">
                <label for="" class="text-gray-500 text-sm">Employee Name</label>
                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.employee.fullname_first" disabled>
            </div>
            <div class="flex flex-1 flex-col gap-1">
                <label for="" class="text-gray-500 text-sm">Date Filed</label>
                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.date_filed" disabled>
            </div>
            <div class="flex flex-1 flex-col gap-1">
                <label for="" class="text-gray-500 text-sm">Amount</label>
                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="useFormatCurrency(data.amount)" disabled>
            </div>
        </div>
        <div class="flex gap-4">
            <div class="flex flex-1 flex-col gap-1">
                <label for="" class="text-gray-500 text-sm">Deduction Name</label>
                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.otherdeduction_name" disabled>
            </div>
            <div class="flex flex-1 flex-col gap-1">
                <label for="" class="text-gray-500 text-sm">Monthly Deduction</label>
                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="useFormatCurrency(data.installment_deduction)" disabled>
            </div>
            <div class="flex flex-1 flex-col gap-1">
                <label for="" class="text-gray-500 text-sm">Payroll Auto Deduction Start</label>
                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.deduction_date_start" disabled>
            </div>
        </div>
        <div class="flex flex-col mt-6">
            <div class="flex items-center justify-between border-b pb-2">
                <label for="" class="text-md text-slate-700 font-bold">Payment List</label>
                <button v-if="!data.isFullyPaid" class="bg-green-500 rounded-md px-4 py-1 text-white hover:bg-green-600 active:bg-green-700" @click="showMakePayment()">
                    <Icon name="iconoir:hand-card" class="font-bold text-xl" />
                    Make Payment
                </button>
            </div>
            <table v-if="data.payments.length > 0" class="table w-full text-left mt-4 border">
                <thead class="border-b">
                    <th class="py-2">
                        Amount Paid
                    </th>
                    <th class="py-2">
                        Date Paid
                    </th>
                    <th class="py-2">
                        Payment Type
                    </th>
                    <th class="py-2">
                        Posting Status
                    </th>
                    <!-- <th>Actions</th> -->
                </thead>
                <tbody>
                    <tr v-for="payment in data.payments" :key="payment.id" class="border">
                        <td class="px-2 py-1 text-slate-600">
                            {{ useFormatCurrency(payment.amount_paid) }}
                        </td>
                        <td class="px-2 py-1 text-slate-600">
                            {{ payment.date_paid }}
                        </td>
                        <td class="px-2 py-1 text-slate-600">
                            {{ payment.payment_type }}
                        </td>
                        <td class="px-2 py-1 text-slate-600">
                            {{ payment.posting_status }}
                        </td>
                        <!-- <td class="py-2">
                            <div class="flex gap-3 items-center">
                                <NuxtLink :to="'/hrms/setup/hmo/edit/' + 1">
                                    <Icon name="iconoir:edit" class="icon bg-green-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-green-500" />
                                </NuxtLink>
                                <Icon name="iconoir:trash" class="icon bg-red-400 rounded h-7 w-7 p-1 cursor-pointer hover:bg-red-500" />
                            </div>
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <div v-else class="w-full py-4 flex justify-center bg-slate-100 items-center">
                <span>No payments yet.</span>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="flex gap-4 mb-2">
            <div class="flex flex-1 flex-col gap-1">
                <label for="" class="text-gray-500 text-sm">Payment Amount</label>
                <input
                    v-model="paymentData.data.paymentAmount"
                    type="number"
                    class="border border-gray-200 bg-white rounded-md"
                    placeholder="0.00"
                    required
                >
            </div>
            <div class="flex flex-1 flex-col gap-1">
                <button class="bg-gray-100 rounded-md px-4 py-1 text-gray-800 hover:bg-gray-200 active:bg-gray-300" @click="cancelPayment()">
                    <Icon name="mingcute:minus-circle-line" class="font-bold text-md text-gray-600 mb-1" />
                    Cancel
                </button>
                <button class="bg-green-500 rounded-md px-8 py-1 text-white hover:bg-green-600 active:bg-green-700" @click="submitPayment()">
                    <Icon name="iconoir:hand-card" class="font-bold text-xl" />
                    Pay
                </button>
            </div>
        </div>
    </div>
</template>
