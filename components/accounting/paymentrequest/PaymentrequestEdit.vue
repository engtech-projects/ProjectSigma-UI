<script setup>
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/requests/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()

const { list: payeeList } = storeToRefs(useStakeHolderStore())
const emit = defineEmits(["view-details"])
const loading = ref(false)
const detailsError = ref(false)
const detailsErrorMsg = ref("")
const snackbar = useSnackbar()
const detail = ref({
    id: null,
    stakeholder_id: null,
    payment_request_id: paymentRequestStore.paymentRequest?.id,
    particulars: "",
    cost: 0,
    vat: 0
})
const details = computed(() => {
    const list = ref([])
    paymentRequestStore.paymentRequest.details.forEach((pr) => {
        detail.value.id = pr.id
        detail.value.payment_request_id = paymentRequestStore.paymentRequest.id
        detail.value.stakeholder_id = pr.stakeholder_id
        detail.value.particulars = pr.particulars
        detail.value.cost = pr.cost
        detail.value.vat = pr.vat

        list.value.push(JSON.parse(JSON.stringify(detail.value)))
    })
    return list.value
})
async function handleSubmit () {
    if (paymentRequestStore.paymentRequest.details.length !== 0 && parseFloat(paymentRequestStore.paymentRequest.total) === total.value) {
        try {
            loading.value = true
            paymentRequestStore.paymentRequest.details = details.value
            await paymentRequestStore.editPaymentRequest()
            if (paymentRequestStore.errorMessage !== "") {
                snackbar.add({
                    type: "error",
                    text: paymentRequestStore.errorMessage
                })
            } else {
                snackbar.add({
                    type: "success",
                    text: paymentRequestStore.successMessage
                })
            }
        } catch (error) {
            snackbar.add({
                type: "error",
                text: "something went wrong."
            })
        } finally {
            loading.value = false
            detailsError.value = false
            detailsErrorMsg.value = ""
        }
    }
    if (paymentRequestStore.paymentRequest.details.length === 0) {
        detailsError.value = true
        detailsErrorMsg.value = "You forgot to add some details."
    }
    if (parseFloat(paymentRequestStore.paymentRequest.total) !== total.value && paymentRequestStore.paymentRequest.details.length > 0) {
        detailsError.value = true
        detailsErrorMsg.value = "Net amount and total details amount did not match."
    }
}

const addEntry = () => {
    detailsError.value = false
    paymentRequestStore.paymentRequest.details.push(JSON.parse(JSON.stringify(detail.value)))
}
const removeEntry = (entry) => {
    paymentRequestStore.paymentRequest.details = paymentRequestStore.paymentRequest.details.filter(e => e !== entry)
}
const setDetailStakeholder = (ac, ev) => {
    ac.stakeholder_id = ev.id
    ac.type = ev.stakeholdable_type
}
const calculateVat = (ac) => {
    if (ac.cost > 0) {
        ac.vat = (paymentRequestStore.vat / 100) * ac.cost
    }
}
const totalCost = computed(() => {
    let total = 0
    paymentRequestStore.paymentRequest.details.forEach((d) => {
        total += parseFloat(d.cost)
    })
    return total
})
const totalVat = computed(() => {
    let total = 0
    paymentRequestStore.paymentRequest.details.forEach((d) => {
        total += parseFloat(d.vat)
    })
    return total
})
const total = computed(() => {
    return totalCost.value + totalVat.value
})
const navigate = (url = "", action = "", pr = null) => {
    history.pushState(null, "", url)
    emit(action)
    if (pr) {
        paymentRequestStore.getPaymentRequest(pr.id)
    }
}
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="bg-white shadow rounded-lg border px-2 relative border-t-4 border-green-500">
            <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Payment Request
                </h2>
            </div>
            <div class="flex flex-col gap-3 p-4 w-full">
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="requestDate" class="block text-sm font-medium text-gray-900 dark:text-white">Request Date</label>
                        <input id="requestDate" v-model="paymentRequestStore.paymentRequest.request_date" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1">
                        <label for="totalAmount" class="block text-sm font-medium text-gray-900 dark:text-white">Net Amount</label>
                        <input
                            id="totalAmount"
                            v-model="paymentRequestStore.paymentRequest.total"
                            type="number"
                            step="0.01"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex flex-col relative flex-1">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-gray-900 dark:text-white">Payee</label>
                            <AccountingStakeholderSelectSearch
                                class="z-50 bg-gray-50 border-gray-200"
                                :options="payeeList"
                                title="name"
                                opid="id"
                                :selected-id="paymentRequestStore.paymentRequest.stakeholder_id"
                                @select="paymentRequestStore.paymentRequest.stakeholder_id = $event.id"
                            />
                        </div>
                        <input
                            v-model="paymentRequestStore.paymentRequest.stakeholder_id"
                            type="text"
                            class="focus:ring-0 text-white absolute left-0 bottom-0 bg-transparent border-none h-[1px] p-0 w-fill"
                            required
                        >
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-between">
                    <div class="flex-1">
                        <label for="totalAmount" class="block text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea
                            id="totalAmount"
                            v-model="paymentRequestStore.paymentRequest.descripton"
                            class="bg-gray-50 border h-24 resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
            <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8" :class="detailsError ? 'bg-red-100' : ''">
                <h2 class="text-center font-bold text-gray-800">
                    PAYMENT REQUEST DETAILS
                </h2>
                <h3 v-if="detailsError" class="text-red-600 text-sm mt-4 font-bold">
                    {{ detailsErrorMsg }}
                </h3>
                <div class="flex flex-col w-full gap-2 mt-4">
                    <div v-for="ac,i in paymentRequestStore.paymentRequest.details" :key="i" class="flex gap-1 w-full items-end">
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-900 dark:text-white">Particulars</label>
                            <input v-model="ac.particulars" type="text" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </div>
                        <div class="flex flex-col relative flex-1">
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Accounts</label>
                                <AccountingStakeholderSelectSearch
                                    class="bg-gray-50 border-gray-200"
                                    :class="'z-' + (30 - i)"
                                    :options="payeeList"
                                    title="name"
                                    opid="id"
                                    height="h-30"
                                    :selected-id="ac.stakeholder_id"
                                    @select="setDetailStakeholder(ac, $event)"
                                />
                            </div>
                            <input
                                v-model="ac.stakeholder_id"
                                type="text"
                                class="focus:ring-0 text-white absolute left-0 bottom-0 bg-transparent border-none h-[1px] p-0 w-fill"
                                required
                            >
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-900 dark:text-white">Cost</label>
                            <input
                                v-model="ac.cost"
                                type="number"
                                step="0.01"
                                class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                @keyup="calculateVat(ac)"
                            >
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-900 dark:text-white">Vat</label>
                            <input v-model="ac.vat" type="number" step="0.01" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-900 dark:text-white">Total</label>
                            <input
                                type="number"
                                step="0.01"
                                :value="parseFloat(ac.cost) + parseFloat(ac.vat)"
                                class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled
                                required
                            >
                        </div>
                        <Icon name="ion:close-round" class="text-red-400 text-2xl mb-1 cursor-pointer hover:text-red-500 active:text-red-600" @click="removeEntry(ac)" />
                    </div>
                    <div v-if="paymentRequestStore.paymentRequest.details.length > 0" class="flex gap-1">
                        <div class="flex-1">
                            <span class="font-bold">
                                TOTAL
                            </span>
                        </div>
                        <div class="flex-1" />
                        <div class="flex-1">
                            <h3 class="font-bold">
                                {{ formatToCurrency(totalCost) }}
                            </h3>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold">
                                {{ formatToCurrency(totalVat) }}
                            </h3>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-green-600" :class="total!==parseFloat(paymentRequestStore.paymentRequest.total) ? 'text-red-600' : ''">
                                {{ formatToCurrency(total) }}
                            </h3>
                        </div>
                    </div>
                </div>
                <i v-if="paymentRequestStore.paymentRequest.details.length === 0" class="text-center block mt-4 mb-2 text-gray-500">
                    There are no entries yet.
                </i>
                <div v-if="paymentRequestStore.paymentRequest.details.length > 0" class="flex justify-left w-full mt-1">
                    <button
                        class="
                            border
                            px-4
                            rounded-xl
                            text-xs
                            py-[2px]
                            bg-green-400
                            cursor-pointer
                            hover:bg-green-500
                            active:bg-green-600"
                        @click.prevent="addEntry"
                    >
                        + Add Details
                    </button>
                </div>
                <button
                    v-else
                    class="
                        border
                        rounded-xl
                        px-4
                        text-xs
                        py-[2px]
                        bg-green-400
                        cursor-pointer
                        hover:bg-green-500
                        active:bg-green-600"
                    @click.prevent="addEntry"
                >
                    + Add Details
                </button>
            </div>
            <div class="flex justify-between w-full mb-8 gap-2 items-center mt-5">
                <button
                    class="text-gray-700 self-start hover:text-blue-500 border-gray-700 mt-2"
                    @click.prevent="navigate('/accounting/payment-request?details=' + paymentRequestStore.paymentRequest.id, 'view-details')"
                >
                    <Icon name="ion:ios-arrow-thin-left" class="mr-1 text-2xl" />
                    Back to details
                </button>
                <div class="flex gap-2">
                    <button
                        type="submit"
                        class="text-white p-2 px-6 bg-teal-600 content-center rounded-md w-fit"
                    >
                        Update Payment Request
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>

</style>
