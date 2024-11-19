<script setup>
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/requests/paymentrequest"

const hrmsApprovals = useApprovalStore()
const paymentRequestStore = usePaymentRequestStore()

const { list: payeeList } = storeToRefs(useStakeHolderStore())

const approvals = await hrmsApprovals.getApprovalByName(APPROVAL_NPO)
const loading = ref(false)
const detailsError = ref(false)
const detailsErrorMsg = ref("")
const snackbar = useSnackbar()
const detail = ref({
    id: null,
    type: null,
    particulars: "",
    cost: 0,
    vat: 0
})
async function handleSubmit () {
    if (paymentRequestStore.paymentRequest.details.length !== 0 && paymentRequestStore.paymentRequest.total === total.value) {
        paymentRequestStore.paymentRequest.approvals = approvals
        try {
            loading.value = true
            await paymentRequestStore.createPaymentRequest()
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
                paymentRequestStore.reset()
            }
        } catch (error) {
            snackbar.add({
                type: "error",
                text: "something went wrong."
            })
        } finally {
            loading.value = false
        }
    }
    if (paymentRequestStore.paymentRequest.details.length === 0) {
        detailsError.value = true
        detailsErrorMsg.value = "You forgot to add some details."
    }
    if (paymentRequestStore.paymentRequest.total !== total.value && paymentRequestStore.paymentRequest.details.length > 0) {
        detailsError.value = true
        detailsErrorMsg.value = "Net amount and total details amount did not match."
    }
    detailsError.value = false
    detailsErrorMsg.value = ""
}

const addEntry = () => {
    detailsError.value = false
    paymentRequestStore.paymentRequest.details.push(JSON.parse(JSON.stringify(detail.value)))
}
const removeEntry = (entry) => {
    paymentRequestStore.paymentRequest.details = paymentRequestStore.paymentRequest.details.filter(e => e !== entry)
}
const setDetailStakeholder = (ac, ev) => {
    ac.id = ev.id
    ac.type = ev.stakeholdable_type
}
const calculateVat = (ac) => {
    if (ac.cost > 0) {
        const vatValue = paymentRequestStore.vat / 100
        ac.vat = vatValue * ac.cost
    } else {
        ac.cost = 0
        ac.vat = 0
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
onMounted(() => {
    paymentRequestStore.reset()
    paymentRequestStore.paymentRequest.request_date = dateToString(new Date())
})
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="bg-white shadow rounded-lg border border-gray-200 px-2 relative">
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
                                    :selected-id="ac.id"
                                    @select="setDetailStakeholder(ac, $event)"
                                />
                            </div>
                            <input
                                v-model="ac.id"
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
                                @change="calculateVat(ac)"
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
                            <h3 class="font-bold text-green-600" :class="total!==paymentRequestStore.paymentRequest.total ? 'text-red-600' : ''">
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
            <div class="flex justify-end w-full mb-8">
                <button
                    type="submit"
                    class="text-white p-2 px-6 bg-teal-600 content-center mt-5 rounded-md w-fit"
                >
                    Create Payment Request
                </button>
            </div>
        </div>
    </form>
</template>
<style scoped>

</style>
