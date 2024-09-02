<script setup>
import { useLoansStore } from "@/stores/hrms/loansAndCash/loans"
const utils = useUtilities()
const loansStore = useLoansStore()
await loansStore.getAllList()
const snackbar = useSnackbar()
const isLoading = ref(false)
const showMakePayment = ref(false)
defineProps({
    data: {
        type: Object,
        required: true,
    },
    showPayementButton: {
        type: String,
        required: true,
    }
})
const emit = defineEmits(["closeViewModal"])
const newPayment = ref({
    id: null,
    loans_id: null,
    amount_paid: null,
    date_paid: utils.value.dateToString(new Date()),
    payment_type: "Manual",
    posting_status: "Posted",
    paymentAmount: null,
})

const resetPayment = () => {
    newPayment.value = {
        id: null,
        loans_id: null,
        amount_paid: null,
        date_paid: utils.value.dateToString(new Date()),
        payment_type: "Manual",
        posting_status: "Posted",
        paymentAmount: null,
    }
}

function formatCurrency (number, locale = "en-US") {
    const formatter = new Intl.NumberFormat(locale, {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    return formatter.format(number)
}

const setShowPayment = (val) => {
    showMakePayment.value = val
}
const makePayment = async (loanId, employeeId) => {
    isLoading.value = true
    newPayment.value.paymentAmount = newPayment.value.amount_paid
    newPayment.value.loans_id = loanId
    newPayment.value.id = employeeId
    await useHRMSApi("/api/loans/manual-payment/" + newPayment.value.loans_id, {
        method: "POST",
        watch: false,
        body: newPayment.value,
        onResponseError: ({ response }) => {
            isLoading.value = false
            snackbar.add({
                type: "error",
                text: response._data.message
            })
            throw new Error(response._data.message)
        },
        onResponse: ({ response }) => {
            isLoading.value = false
            if (response.ok) {
                snackbar.add({
                    type: "success",
                    text: response._data.message
                })
            }
            data.value.loan_payments_employee.push(JSON.parse(JSON.stringify(newPayment.value)))
            showMakePayment.value = false
            resetPayment()
            emit("closeViewModal")
        },
    })
}

</script>
<template>
    <form action="" @submit.prevent="makePayment(data.id, data.employee_id)">
        <div class="flex flex-col gap-2">
            <div v-if="showMakePayment">
                <div class="flex gap-4 mb-2">
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Payment Amount</label>
                        <input
                            v-model="newPayment.amount_paid"
                            type="number"
                            class="border border-gray-200 bg-white rounded-md"
                            placeholder="0.00"
                            required
                        >
                    </div>
                </div>
            </div>
            <div v-else class="flex flex-col gap-2">
                <div class="flex gap-4">
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Employee Name</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.fullName" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Date Filed</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.date_filed" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Loan Amount</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="formatCurrency(data.amount)" disabled>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Period Start</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.deduction_date_start" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Period End</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.period_end" disabled>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex flex-1 flex-col gap-1">
                        <label for="" class="text-gray-500 text-sm">Deduction</label>
                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="formatCurrency(data.installment_deduction)" disabled>
                    </div>
                    <div class="flex flex-1 flex-col gap-1" />
                    <div class="flex flex-1 flex-col gap-1" />
                </div>
            </div>
            <div class="flex flex-col mt-6">
                <div v-if="data.balance > 0" class="flex items-center justify-between border-b pb-2">
                    <label for="" class="text-md text-slate-700 font-bold">Payment List</label>
                    <div v-if="showMakePayment" class="flex gap-4 items-center">
                        <button class="bg-gray-100 rounded-md px-4 py-1 text-gray-800 hover:bg-gray-200 active:bg-gray-300" @click="setShowPayment(false)">
                            <Icon name="mingcute:minus-circle-line" class="font-bold text-md text-gray-600 mb-1" />
                            Cancel
                        </button>
                        <button class="bg-green-500 rounded-md px-8 py-1 text-white hover:bg-green-600 active:bg-green-700" @click="setShowPayment(true)">
                            <Icon name="iconoir:hand-card" class="font-bold text-xl" />
                            Pay
                        </button>
                    </div>
                    <button v-else class="bg-green-500 rounded-md px-4 py-1 text-white hover:bg-green-600 active:bg-green-700" @click="setShowPayment(true)">
                        <Icon name="iconoir:hand-card" class="font-bold text-xl" />
                        Make Payment
                    </button>
                </div>
                <!-- Employee Payments' List -->
                <table v-if="data.loan_payments_employee.length > 0" class="table w-full text-left mt-4 border">
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
                    </thead>
                    <tbody>
                        <tr v-for="payment in data.loan_payments_employee" :key="payment.id" class="border">
                            <td class="px-2 py-1 text-slate-600">
                                {{ utils.formatCurrency(payment.amount_paid) }}
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
                        </tr>
                    </tbody>
                </table>
                <div v-else class="w-full py-4 flex justify-center bg-slate-100 items-center">
                    <span>No payments yet.</span>
                </div>
            </div>
        </div>
    </form>
</template>
