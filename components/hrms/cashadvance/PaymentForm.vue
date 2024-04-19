<script setup lang="ts">
// import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()

const snackbar = useSnackbar()
const isLoading = ref(false)

// const makePayment = async () => {
//     isLoading.value = true
//     newPayment.value.paymentAmount = newPayment.value.amount_paid
//     await useHRMSApi("/api/loans/manual-payment/" + newPayment.value.loans_id, {
//         method: "POST",
//         watch: false,
//         body: newPayment.value,
//         onResponseError: ({ response }) => {
//             isLoading.value = false
//             snackbar.add({
//                 type: "error",
//                 text: response._data.message
//             })
//             throw new Error(response._data.message)
//         },
//         onResponse: ({ response }) => {
//             isLoading.value = false
//             if (response.ok) {
//                 snackbar.add({
//                     type: "success",
//                     text: response._data.message
//                 })
//             }
//             loan.value.loan_payments_employee.push(JSON.parse(JSON.stringify(newPayment.value)))
//             resetPayment()
//             showMakePayment.value = false
//         },
//     })
// }

const submitForm = async () => {
    try {
        boardLoading.value = true
        await cashadvances.createRequest()
        if (cashadvances.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: cashadvances.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: cashadvances.successMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: cashadvances.errorMessage
        })
    } finally {
        cashadvances.clearMessages()
        boardLoading.value = false
    }
}

const showModal = ref(false)
const showMakePayment = ref(false)

const setShowPayment = (val:boolean) => {
    showMakePayment.value = val
}
</script>

<template>
    <div class="text-gray-500">
        <form @submit.prevent="submitForm">
            <div class="flex items-center justify-between border-b pb-2">
                <label for="" class="text-md text-slate-700 font-bold">Payments List</label>
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
        </form>
        <ModalContainer
            :title="showMakePayment ? 'New Payment' : 'Cash Advance Details'"
            :loading="isLoading"
            :local="true"
            :show="showModal"
            size="modal-lg"
            @hide="showModal=false;showMakePayment=false"
        >
            <form action="" @submit.prevent="makePayment">
                <div class="flex flex-col gap-2">
                    <div v-if="showMakePayment">
                        <div class="flex gap-4 mb-2">
                            <div class="flex flex-1 flex-col gap-1">
                                <label for="" class="text-gray-500 text-sm">Payment Amount</label>
                                <input
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
                                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" disabled>
                            </div>
                            <div class="flex flex-1 flex-col gap-1">
                                <label for="" class="text-gray-500 text-sm">Date Filed</label>
                                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" disabled>
                            </div>
                            <div class="flex flex-1 flex-col gap-1">
                                <label for="" class="text-gray-500 text-sm">Loan Amount</label>
                                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" disabled>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex flex-1 flex-col gap-1">
                                <label for="" class="text-gray-500 text-sm">Loan Term Length</label>
                                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" disabled>
                            </div>
                            <div class="flex flex-1 flex-col gap-1">
                                <label for="" class="text-gray-500 text-sm">Period Start</label>
                                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" disabled>
                            </div>
                            <div class="flex flex-1 flex-col gap-1">
                                <label for="" class="text-gray-500 text-sm">Period End</label>
                                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" disabled>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div class="flex flex-1 flex-col gap-1">
                                <label for="" class="text-gray-500 text-sm">Deduction</label>
                                <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" disabled>
                            </div>
                            <div class="flex flex-1 flex-col gap-1" />
                            <div class="flex flex-1 flex-col gap-1" />
                        </div>
                    </div>
                    <!-- <div class="flex gap-4">

                        </div> -->
                    <div class="flex flex-col mt-6">
                        <div class="flex items-center justify-between border-b pb-2">
                            <label for="" class="text-md text-slate-700 font-bold">Payments List</label>
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
                        <table class="table w-full text-left mt-4 border">
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
                                <!-- <tr v-for="payment in loan.loan_payments_employee" :key="payment.id" class="border"> -->
                                <tr class="border">
                                    <td class="px-2 py-1 text-slate-600">
                                        test
                                    </td>
                                    <td class="px-2 py-1 text-slate-600">
                                        test
                                    </td>
                                    <td class="px-2 py-1 text-slate-600">
                                        test
                                    </td>
                                    <td class="px-2 py-1 text-slate-600">
                                        test
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="w-full py-4 flex justify-center bg-slate-100 items-center">
                            <span>No payments yet.</span>
                        </div>
                    </div>
                </div>
            </form>
        </ModalContainer>
    </div>
</template>

<style scoped>
.error-message,
.success-message {
    transition: opacity 1s ease;
}

.error-message.fade-out,
.success-message.fade-out {
    animation-duration: 1s;
    opacity: 0;
}
</style>
