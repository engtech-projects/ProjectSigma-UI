<script setup>
import { storeToRefs } from "pinia"
import { useCashadvanceStore } from "@/stores/hrms/loansAndCash/cashadvance"

const cashadvances = useCashadvanceStore()
const { list: cashadvanceList } = storeToRefs(cashadvances)

const snackbar = useSnackbar()
const boardLoading = ref(false)
const cashadvanceData = ref(null)
const showInformationModal = ref(false)

const showInformation = (data) => {
    cashadvanceData.value = data
    newPayment.value.cashadvance_id = data.id
    showInformationModal.value = true
}
const closeViewModal = () => {
    showInformationModal.value = false
}

const showMakePayment = ref(false)

const setShowPayment = (val) => {
    showMakePayment.value = val
}

const headers = [
    { name: "Employee Name", id: "employee.fullname_first" },
    { name: "Project", id: "project_id" },
    { name: "Cash Advance Amount", id: "amount" },
    { name: "Terms", id: "terms_of_payment" },
    { name: "No. of Installment(s)", id: "no_of_installment" },
    { name: "Installment Deduction", id: "installment_deduction" },
    { name: "Deduction Date start", id: "deduction_date_start" },
    { name: "Purpose", id: "purpose" },
    { name: "Remarks", id: "remarks" },
]

const utils = useUtilities()
// const ca = ref({ ca_payments_employee: [] })
const newPayment = ref({
    id: null,
    cashadvance_id: null,
    amount_paid: null,
    date_paid: utils.value.dateToString(new Date()),
    payment_type: "Manual",
    posting_status: "Posted",
    paymentAmount: null,
})

const resetPayment = () => {
    newPayment.value = {
        id: null,
        cashadvance_id: null,
        amount_paid: null,
        date_paid: utils.value.dateToString(new Date()),
        payment_type: "Manual",
        posting_status: "Posted",
        paymentAmount: null,
    }
}

const makePayment = async () => {
    boardLoading.value = true
    newPayment.value.paymentAmount = newPayment.value.amount_paid
    await useHRMSApi("/api/cash-advance/manual-payment/" + newPayment.value.cashadvance_id, {
        method: "POST",
        watch: false,
        body: newPayment.value,
        onResponseError: ({ response }) => {
            boardLoading.value = false
            snackbar.add({
                type: "error",
                text: response._data.message
            })
            throw new Error(response._data.message)
        },
        onResponse: ({ response }) => {
            boardLoading.value = false
            if (response.ok) {
                snackbar.add({
                    type: "success",
                    text: response._data.message
                })
            }
            cashadvanceData.value.cash_advance_payments.push(JSON.parse(JSON.stringify(newPayment.value)))
            resetPayment()
            showMakePayment.value = false
        },
    })
}

const actions = {
    // edit: true,
    // delete: true,
    showTable: true,
}

</script>

<template>
    <div class="pb-2 text-gray-500 p-2">
        <LayoutPsTable
            :header-columns="headers"
            :datas="cashadvanceList"
            :actions="actions"
            @show-table="showInformation"
        />
    </div>
    <div v-if="showInformationModal">
        <Teleport to="body">
            <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
                <div class="bg-white p-4 w-8/12 h-4/5 mt-10 ml-64 gap-2 rounded-md overflow-auto absolute">
                    <!-- <pre>{{ cashadvanceData }}</pre> -->
                    <div class="flex gap-2 justify-between p-2">
                        <p class="text-slate-600">
                            Cash Advance (<span class="text-blue-500">{{ cashadvanceData.id }}</span>)
                        </p>
                        <button
                            @click="closeViewModal"
                        >
                            <Icon name="cil:x" color="green" class="w-4 h-4" />
                            Close
                        </button>
                    </div>
                    <form action="" @submit.prevent="makePayment">
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

                            <div v-else class="flex flex-col gap-2 p-2">
                                <div class="flex gap-4">
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">Employee Name: </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.employee.fullname_first || ''" disabled>
                                    </div>
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">Project Code: </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.project.project_code" disabled>
                                    </div>
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">Cash Advance Amount: </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.amount" disabled>
                                    </div>
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">Terms: </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.terms_of_payment" disabled>
                                    </div>
                                </div>
                                <div class="flex gap-4">
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">No. of Installment(s): </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.no_of_installment" disabled>
                                    </div>
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">Installment Deduction: </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.installment_deduction" disabled>
                                    </div>
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">Deduction Date start: </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.deduction_date_start" disabled>
                                    </div>
                                    <div class="flex flex-1 flex-col gap-1">
                                        <label class="font-semibold text-gray-700">Purpose/Reason(s): </label>
                                        <input type="text" class="border border-gray-200 bg-gray-100 rounded-md" :value="cashadvanceData.purpose" disabled>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-col mt-6 p-2">
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
                                <table v-if="cashadvanceData.cash_advance_payments.length > 0" class="table w-full text-left mt-4 border">
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
                                        <tr v-for="payment in cashadvanceData.cash_advance_payments" :key="payment.id" class="border">
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
                </div>
            </div>
        </Teleport>
    </div>
</template>
