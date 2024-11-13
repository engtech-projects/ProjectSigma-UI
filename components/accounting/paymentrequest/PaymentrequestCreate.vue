<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()

const { list: payeeList } = storeToRefs(useStakeholderStore())

const loading = ref(false)
const snackbar = useSnackbar()
const detail = ref({
    id: null,
    type: null,
    particulars: "",
    cost: 0,
    vat: 0
})
async function handleSubmit () {
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

const addEntry = () => {
    paymentRequestStore.paymentRequest.details.push(JSON.parse(JSON.stringify(detail.value)))
}
const removeEntry = (entry) => {
    paymentRequestStore.paymentRequest.details = paymentRequestStore.paymentRequest.details.filter(e => e !== entry)
}
const setDetailStakeholder = (ac, ev) => {
    ac.id = ev.id
    ac.type = ev.stakeholdable_type
    console.log(ac)
}
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
                        <input id="totalAmount" v-model="paymentRequestStore.paymentRequest.total" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1 gap-2">
                        <label for="payee" class="block text-sm font-medium text-gray-900 dark:text-white">Payee</label>
                        <AccountingStakeholderSelectSearch
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
                            v-model="paymentRequestStore.paymentRequest.descripton"
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
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Particulars</label>
                                <input v-model="ac.particulars" type="text" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Proj Code</label>
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
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Cost</label>
                                <input v-model="ac.cost" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Vat</label>
                                <input v-model="ac.vat" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Total</label>
                                <input
                                    type="number"
                                    :value="parseFloat(ac.cost) + parseFloat(ac.vat)"
                                    class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled
                                    required
                                >
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
