<script setup>
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
import { useApprovalStore, APPROVAL_PAYMENT_REQUEST_NPO } from "@/stores/hrms/setup/approvals"
const paymentRequestStore = usePaymentRequestStore()
const { paymentRequest, vat } = storeToRefs(paymentRequestStore)
const snackbar = useSnackbar()
const approvals = useApprovalStore()
await paymentRequestStore.getVat()

paymentRequest.value.approvals = await approvals.getApprovalByName(APPROVAL_PAYMENT_REQUEST_NPO)
const details = ref({
    stakeholder_id: null,
    particulars: "",
    stakeholderInformation: {},
    cost: 0,
    vat: vat.value
})
const addPaymentRequest = async () => {
    try {
        await paymentRequestStore.addPaymentRequest()
        snackbar.add({
            type: "success",
            text: paymentRequest.value.successMessage
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: paymentRequest.value.errorMessage
        })
    }
}
const removeDetails = (index) => {
    paymentRequest.value.details.splice(index, 1)
}
const addDetails = () => {
    paymentRequest.value.details.push(details.value)
    details.value = {
        stakeholder_id: null,
        particulars: "",
        stakeholderInformation: {},
        cost: 0,
        vat: vat.value
    }
}
onMounted(() => {
    paymentRequest.value.prf_no = paymentRequestStore.generatePrNo()
})
</script>
<template>
    <LayoutBoards title="Payment Request Form (non-Purchase)" :loading="paymentRequest.isLoading" class="w-90">
        <div>
            <form @submit.prevent="addPaymentRequest">
                <div class="flex flex-col gap-16 pb-24 pt-8">
                    <AccountingCommonEvenparHeader />
                    <h1 class="text-2xl text-center font-bold">
                        PAYMENT REQUEST FORM
                    </h1>
                    <div class="w-full">
                        <div class="flex gap-2">
                            <div class="w-full">
                                <label
                                    for="prf"
                                    class="text-xs italic"
                                >PRF Number</label>
                                <input
                                    id="prf"
                                    v-model="paymentRequest.prf_no"
                                    type="text"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                            <div class="w-full">
                                <label
                                    for="total"
                                    class="text-xs italic"
                                >Total Amount</label>
                                <input
                                    id="total"
                                    v-model="paymentRequest.total"
                                    type="number"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                            <div class="w-full">
                                <label
                                    for="total"
                                    class="text-xs italic"
                                >Total Vat</label>
                                <input
                                    id="total"
                                    v-model="paymentRequest.totalVat"
                                    type="number"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    for="payee"
                                    class="text-xs italic"
                                >Payee</label>
                                <AccountingCommonSelectStakeHolder
                                    v-model:stakeholder-info="paymentRequest.stakeholderInformation"
                                    class="w-full"
                                    :selected-id="paymentRequest.stakeholder_id"
                                />
                            </div>
                            <div>
                                <label
                                    for="date"
                                    class="text-xs italic"
                                >Date</label>
                                <input
                                    id="date"
                                    v-model="paymentRequest.request_date"
                                    type="date"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                        </div>
                        <div>
                            <div class="w-full">
                                <label
                                    for="description"
                                    class="text-xs italic"
                                >Description</label>
                                <textarea
                                    id="description"
                                    v-model="paymentRequest.description"
                                    class="w-full rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-bold text-center">
                                PAYMENT REQUEST DETAILS
                            </h2>
                            <button
                                class="text-white p-2 px-4 bg-teal-600 content-center mt-5 rounded-md w-fit"
                                @click.prevent="addDetails"
                            >
                                <Icon name="fa:plus-circle" />
                            </button>
                        </div>
                        <div v-show="paymentRequest.details.length > 0" class="flex flex-col bg-gray-100 rounded-lg gap-2">
                            <div v-for="ae,i in paymentRequest.details" :key="i" class="flex gap-2">
                                <div class="flex-1">
                                    <label
                                        for="particulars"
                                        class="text-xs italic"
                                    >Particulars</label>
                                    <input
                                        id="particulars"
                                        v-model="ae.particulars"
                                        type="text"
                                        class="w-full rounded-lg h-9 text-sm bg-gray-100"
                                        required
                                    >
                                </div>
                                <div class="flex-1">
                                    <label
                                        for="projectCode"
                                        class="text-xs italic"
                                    >Project/Section Code</label>
                                    <AccountingCommonSelectStakeHolder
                                        v-model:stakeholder-info="ae.stakeholderInformation"
                                        class="w-full"
                                        :selected-id="ae.stakeholderInformation"
                                    />
                                </div>
                                <div class="flex-1">
                                    <label
                                        for="cost"
                                        class="text-xs italic"
                                    >Cost</label>
                                    <input
                                        id="cost"
                                        v-model="ae.cost"
                                        type="number"
                                        class="w-full rounded-lg h-9 text-sm bg-gray-100"
                                        required
                                    >
                                </div>
                                <div class="flex-1">
                                    <label
                                        for="vat"
                                        class="text-xs italic"
                                    >Vat %</label>
                                    <input
                                        id="vat"
                                        v-model="ae.vat"
                                        disabled
                                        type="number"
                                        class="w-full rounded-lg h-9 text-sm bg-gray-100"
                                        required
                                    >
                                </div>
                                <div class="flex-1">
                                    <label
                                        for="total"
                                        class="text-xs italic"
                                    >Amount</label>
                                    <input
                                        id="total"
                                        :value="Number(ae.cost) + Number(ae.vat)"
                                        type="number"
                                        class="w-full rounded-lg h-9 text-sm bg-gray-100"
                                        disabled
                                    >
                                </div>
                                <div>
                                    <button
                                        class="text-white p-2 bg-red-500 content-center mt-5 rounded-md w-fit"
                                        @click.prevent="removeDetails(i)"
                                    >
                                        <Icon name="ion:trash" color="white" class="bg-red-500 rounded h-8 w-8 p-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <span v-if="paymentRequest.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                    <div class="w-full">
                        <HrmsCommonRequestedBy />
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                        <div>
                            <AccountingSetupApprovalsList
                                v-for="(approv, apr) in paymentRequest.approvals"
                                :key="'hrmsetupapprovallist'+apr"
                                v-model="paymentRequest.approvals[apr]"
                            />
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="flex gap-2 jus">
                            <button
                                type="submit"
                                class="text-white p-2 px-4 bg-teal-600 content-center mt-5 rounded-md w-fit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </LayoutBoards>
</template>
