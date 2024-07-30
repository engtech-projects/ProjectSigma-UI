<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})
const showMakePayment = ref(false)

const setShowPayment = (val) => {
    showMakePayment.value = val
}

const utils = useUtilities()
// const resetPayment = () => {
//     const id = newPayment.value.cashadvance_id
//     newPayment.value = {
//         id: null,
//         cashadvance_id: id,
//         amount_paid: null,
//         date_paid: utils.value.dateToString(new Date()),
//         payment_type: "Manual",
//         posting_status: "Posted",
//         paymentAmount: null,
//     }
// }
// const updateCA = () => {
//     cashadvances.list.forEach((el) => {
//         if (el.id === data.value.id) {
//             data.value = el
//         }
//     })
// }

const cashadvances = useCashadvanceStore()
const { data: userData } = useAuth()

const showModal = defineModel("showModal", { required: false, type: Boolean })
const { remarks, newPayment } = storeToRefs(cashadvances)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await cashadvances.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
        showInformationModal.value = false
    }
}

const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await cashadvances.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
        showInformationModal.value = false
    }
}

async function nowMakePayment (id) {
    try {
        this.newPayment.cashadvance_id = id
        this.newPayment.paymentAmount = this.newPayment.amount_paid
        await cashadvances.makePayment(id)
        boardLoading.value = false
        snackbar.add({
            type: "success",
            text: cashadvances.successMessage
        })
    } catch {
        boardLoading.value = false
        snackbar.add({
            type: "error",
            text: cashadvances.errorMessage || "something went wrong."
        })
    } finally {
        // accountType.clearMessages()
    }
}
</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Cash Advance">
        <template #body>
            <form action="" @submit.prevent="nowMakePayment(data.id)">
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col gap-2 p-2">
                        <div class="grid gap-4">
                            <div class="grid grid-cols-3 gap-4">
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Employee Name: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.employee.fullname_first || ''" disabled>
                                </div>
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Project: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.project ? data.project.project_code : 'N/A' " disabled>
                                </div>
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Department: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.department ? data.department.department_name : 'N/A' " disabled>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Cash Advance Amount: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.amount" disabled>
                                </div>
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Terms: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.terms_of_payment" disabled>
                                </div>
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Purpose/Reason(s): </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.purpose" disabled>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Installment Deduction: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.installment_deduction" disabled>
                                </div>
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Deduction Date start: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.deduction_date_start" disabled>
                                </div>
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Balance: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.balance" disabled>
                                </div>
                            </div>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="flex flex-1 flex-col gap-1">
                                    <label class="font-semibold text-gray-700">Total Amount Paid: </label>
                                    <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="data.total_paid" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="data.approvals" />
                    </div>
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

                    <div v-if="data.request_status === 'Approved'" class="flex flex-col mt-6 p-2">
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
                        <table v-if="data.cash_advance_payments.length > 0" class="table w-full text-left mt-4 border">
                            <thead class="border-b">
                                <th class="p-2">
                                    Amount Paid
                                </th>
                                <th class="p-2">
                                    Date Paid
                                </th>
                                <th class="p-2">
                                    Payment Type
                                </th>
                                <th class="p-2">
                                    Posting Status
                                </th>
                            </thead>
                            <tbody>
                                <tr v-for="payment in data.cash_advance_payments" :key="payment.id" class="border">
                                    <td class="px-2 p-1 text-slate-600">
                                        {{ utils.formatCurrency(payment.amount_paid) }}
                                    </td>
                                    <td class="px-2 p-1 text-slate-600">
                                        {{ payment.date_paid }}
                                    </td>
                                    <td class="px-2 p-1 text-slate-600">
                                        {{ payment.payment_type }}
                                    </td>
                                    <td class="px-2 p-1 text-slate-600">
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
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end">
                <button
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                    @click="approvedRequest(data.id)"
                >
                    Approve Request
                </button>
                <button
                    data-popover-target="popover-deny-travelorder-request"
                    class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                >
                    Deny Request
                </button>
            </div>
            <div id="popover-deny-travelorder-request" data-popover role="tooltip" class="absolute z-10 invisible inline-block w-96 text-sm text-gray-500 transition-opacity duration-300 bg-gray-800 border border-gray-200 shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 p-4">
                <div>
                    <div class="text-white text-lg">
                        Cash Advance List
                    </div>
                    <div>
                        <div class="w-full">
                            <p class="text-md">
                                Are you sure you want to deny this process?
                            </p>
                        </div>
                        <div class="py-2 flex-col flex gap-2">
                            <label for="deny-remarks">Your remarks if deny</label>
                            <textarea v-model="remarks" cols="30" rows="10" />
                        </div>
                        <div class="w-full py-2 flex gap-2 justify-end">
                            <button
                                class="bg-green-600 p-2 hover:bg-green-900 text-white round-sm"
                                @click="denyRequest(data.id)"
                            >
                                Deny Request
                            </button>
                            <button
                                class="bg-yellow-600 p-2 hover:bg-yellow-900 text-white round-sm"
                                @click="clearRemarks"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div data-popper-arrow />
            </div>
        </template>
    </PsModal>
</template>
