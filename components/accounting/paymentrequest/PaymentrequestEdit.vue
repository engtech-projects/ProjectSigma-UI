<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()

const { list: payeeList } = storeToRefs(useStakeholderStore())

const emit = defineEmits(["view-details"])
const loading = ref(false)
const snackbar = useSnackbar()
const detail = ref({
    id: null,
    payment_request_id: paymentRequestStore.paymentRequest.id,
    stakeholder_id: null,
    particulars: "",
    cost: 0,
    vat: 0
})
const details = computed(() => {
    const list = ref([])
    paymentRequestStore.paymentRequest.details.forEach((pr) => {
        detail.value.id = pr.id
        detail.value.payment_request_id = pr.payment_request_id
        detail.value.stakeholder_id = pr.stakeholder_id
        detail.value.particulars = pr.particulars
        detail.value.cost = pr.cost
        detail.value.vat = pr.vat

        list.value.push(JSON.parse(JSON.stringify(detail.value)))
    })
    return list.value
})
async function handleSubmit () {
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
    }
}

const resetDetail = () => {
    detail.value = {
        id: null,
        payment_request_id: paymentRequestStore.paymentRequest.id,
        stakeholder_id: null,
        particulars: "",
        cost: 0,
        vat: 0
    }
}

const addEntry = () => {
    resetDetail()
    paymentRequestStore.paymentRequest.details.push(JSON.parse(JSON.stringify(detail.value)))
}
const removeEntry = (entry) => {
    paymentRequestStore.paymentRequest.details = paymentRequestStore.paymentRequest.details.filter(e => e !== entry)
}
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
        <div class="bg-white shadow rounded-lg border px-2 border-t-4 border-green-500 relative">
            <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Payment Request Edit
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
                        <input id="totalAmount" v-model="paymentRequestStore.paymentRequest.total" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1 gap-2">
                        <label for="payee" class="block text-sm font-medium text-gray-900 dark:text-white">Payee</label>
                        <AccountingSelectSearch
                            class="z-50 bg-gray-50 border-gray-200"
                            :options="payeeList"
                            title="name"
                            opid="id"
                            :selected-id="paymentRequestStore.paymentRequest.stakeholder_id"
                            @select="paymentRequestStore.paymentRequest.stakeholder_id = $event.id"
                        />
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-between">
                    <div class="flex-1">
                        <label for="totalAmount" class="block text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea
                            id="totalAmount"
                            v-model="paymentRequestStore.paymentRequest.description"
                            class="bg-gray-50 border h-24 resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
            <form action="">
                <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                    <h2 class="text-center font-bold text-gray-800">
                        PAYMENT REQUEST DETAILS
                    </h2>
                    <div class="flex flex-col w-full gap-2 mt-4">
                        <div v-for="ac,i in paymentRequestStore.paymentRequest.details" :key="i" class="flex gap-1 w-full items-end">
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Stakeholder</label>
                                <AccountingSelectSearch
                                    class="bg-gray-50 border-gray-200"
                                    :class="'z-' + (30 - i)"
                                    height="h-30"
                                    :options="payeeList"
                                    :selected-id="ac.stakeholder_id"
                                    title="name"
                                    opid="id"
                                    @select="ac.stakeholder_id = $event.id"
                                />
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Particulars</label>
                                <input v-model="ac.particulars" type="text" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Cost</label>
                                <input v-model="ac.cost" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Vat</label>
                                <input v-model="ac.vat" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <Icon name="ion:close-round" class="text-red-400 text-2xl mb-1 cursor-pointer hover:text-red-500 active:text-red-600" @click="removeEntry(ac)" />
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
            </form>
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
.z-30 {
    z-index: 30;
}
.z-29 {
    z-index: 29;
}
.z-28 {
    z-index: 28;
}
.z-27 {
    z-index: 27;
}
.z-26 {
    z-index: 26;
}
.z-30 {
    z-index: 30;
}
.z-25 {
    z-index: 25;
}
.z-24 {
    z-index: 24;
}
.z-23 {
    z-index: 23;
}
.z-22 {
    z-index: 22;
}
.z-21 {
    z-index: 21;
}
.z-20 {
    z-index: 20;
}
.z-19 {
    z-index: 19;
}
.z-18 {
    z-index: 18;
}
.z-17 {
    z-index: 17;
}
.z-16 {
    z-index: 16;
}
.z-15 {
    z-index: 15;
}
.z-14 {
    z-index: 14;
}
.z-13 {
    z-index: 13;
}
</style>
