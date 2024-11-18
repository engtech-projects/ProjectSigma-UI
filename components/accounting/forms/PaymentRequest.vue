<script setup>
import { usePaymentRequestStore } from "~/stores/accounting/requests/paymentrequest"
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"

const stakeholderStore = useStakeHolderStore()
const paymentRequestStore = usePaymentRequestStore()
const detail = ref({
    stakeholder_id: null,
    particulars: "",
    cost: 0,
    vat: 0
})
const details = ref([])
const loading = ref(false)
const addDetails = () => {
    details.value.push(detail.value)
    details.value = {
        stakeholder_id: null,
        particulars: "",
        cost: 0,
        vat: 0
    }
}
const snackbar = useSnackbar()
const generatePrNo = () => {
    return "PR-" + randomInt(100001, 999999) + "-" + randomInt(1000, 9999)
}

const removeLine = (line) => {
    details.value = details.value.filter(acc => acc !== line)
}

async function handleSubmit () {
    try {
        loading.value = true
        paymentRequestStore.paymentRequest.total = 0
        paymentRequestStore.paymentRequest.details = details.value
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
            details.value = []
            paymentRequestStore.reset()
            // navigateTo("/accounting/voucher/disbursement")
        }
    } catch (error) {
        // paymentRequestStore.errorMessage = error.Message
        // snackbar.add({
        //     type: "error",
        //     text: paymentRequestStore.errorMessage
        // })
    } finally {
        loading.value = false
    }
}
onMounted(() => {
    paymentRequestStore.paymentRequest.prf_no = generatePrNo()
})
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-16 pb-24 pt-8">
            <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <AccountingCommonEvenparHeader />
            <h1 class="text-2xl text-center font-bold">
                PAYMENT REQUEST FORM
            </h1>
            <div class="flex gap-12">
                <div class="flex flex-col flex-1">
                    <div class="flex-1">
                        <label
                            for="payee"
                            class="text-xs italic"
                        >Payee</label>
                        <AccountingSelectSearch
                            class="z-50"
                            :options="stakeholderStore.list"
                            title="name"
                            opid="id"
                            :selected-id="paymentRequestStore.paymentRequest.stakeholder_id"
                            @select="paymentRequestStore.paymentRequest.stakeholder_id=$event.id"
                        />
                    </div>
                    <div class="flex-1">
                        <label
                            for="description"
                            class="text-xs italic"
                        >Description</label>
                        <textarea
                            id="description"
                            v-model="paymentRequestStore.paymentRequest.details"
                            class="w-full rounded-lg"
                        />
                    </div>
                </div>
                <div class="flex flex-col flex-1">
                    <div class="flex-1">
                        <label
                            for="prf"
                            class="text-xs italic"
                        >PRF Number</label>
                        <input
                            id="prf"
                            v-model="paymentRequestStore.paymentRequest.prf_no"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="date"
                            class="text-xs italic"
                        >Date</label>
                        <input
                            id="date"
                            v-model="paymentRequestStore.paymentRequest.request_date"
                            type="date"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
            </div>
            <div class="mb-16">
                <h2 class="text-xl font-bold text-center mb-10">
                    PAYMENT REQUEST DETAILS
                </h2>
                <form @submit.prevent="addDetails">
                    <div class="flex flex-col lg:flex-row gap-2 bg-yellow-100 rounded-lg px-6 py-4">
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Project/Section Code</label>
                            <AccountingSelectSearch
                                class="z-40 bg-white"
                                :options="stakeholderStore.list"
                                title="name"
                                opid="id"
                                :selected-id="detail.stakeholder_id"
                                @select="detail.stakeholder_id=$event.id"
                            />
                        </div>
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Particulars</label>
                            <input
                                id="credit"
                                v-model="detail.particulars"
                                type="text"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="debit"
                                class="text-xs italic"
                            >Cost</label>
                            <input
                                id="debit"
                                v-model="detail.cost"
                                type="number"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <div class="flex-1">
                            <label
                                for="credit"
                                class="text-xs italic"
                            >Vat</label>
                            <input
                                id="credit"
                                v-model="detail.vat"
                                type="number"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <button
                            type="submit"
                            class="text-white p-2 px-4 bg-teal-600 content-center mt-5 rounded-md w-fit"
                        >
                            Add line
                        </button>
                    </div>
                </form>
                <div v-show="details.length > 0" class="flex flex-col bg-gray-100 rounded-lg px-8 py-4 gap-2">
                    <div v-for="ae,i in details" :key="i" class="flex gap-2">
                        <div class="flex-1">
                            <label
                                for="amountInWords"
                                class="text-xs italic"
                            >Project/Section Code</label>
                            <select v-model="ae.stakeholder_id" class="w-full rounded-lg h-9 text-sm bg-gray-100">
                                <option v-for="st in stakeholderStore.list" :key="st.id" :value="st.id">
                                    {{ st.name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <label
                                for="amountInWords"
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
                            >Vat</label>
                            <input
                                id="vat"
                                v-model="ae.vat"
                                type="number"
                                class="w-full rounded-lg h-9 text-sm bg-gray-100"
                                required
                            >
                        </div>
                        <button
                            class="text-white p-2 px-4 bg-red-500 content-center mt-5 rounded-md w-fit"
                            @click.prevent="removeLine(ae)"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <span v-if="details.length === 0" class="block text-center text-gray-600">
                    No entries yet.
                </span>
            </div>
            <div class="flex justify-end">
                <div class="flex gap-2 jus">
                    <!-- <NuxtLink
                        to="/accounting/voucher/disbursement"
                        class="text-white p-2 px-6 rounded bg-gray-600 content-center mt-5 rounded-md w-fit"
                    >
                        <span>Back</span>
                    </NuxtLink> -->
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
</template>
