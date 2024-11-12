<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()

const stakeholderStore = useStakeholderStore()

const emit = defineEmits(["create", "edit", "backToList", "detach"])
const props = defineProps({
    target: {
        type: String,
        default: ""
    },
    border: {
        type: Boolean,
        default: true
    },
    detach: {
        type: Boolean,
        default: false
    }
})

const stakeholder = (id) => {
    return stakeholderStore.list.filter(st => st.id === id)[0]
}
const totalCost = computed(() => {
    let amount = 0
    paymentRequestStore.paymentRequest.details.forEach((v) => {
        amount += parseFloat(v.cost)
    })
    return amount
})
const totalVat = computed(() => {
    let amount = 0
    paymentRequestStore.paymentRequest.details.forEach((v) => {
        amount += parseFloat(v.vat)
    })
    return amount
})
function print () {
    const divToPrint = document.getElementById("toPrint")
    const tailwindCSSUrl = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"

    const printWindow = window.open("", "_blank", `width=${screen.width},height=${screen.height}`)
    const htmlString = `<html><head><link href='${tailwindCSSUrl}' rel='stylesheet'></head><body>${divToPrint.outerHTML}</body></html>`

    printWindow.document.write(htmlString)
    printWindow.document.close()

    printWindow.onload = function () {
        printWindow.focus()
        printWindow.print()
    }
}

const statusColor = computed(() => {
    if (paymentRequestStore.paymentRequest.form?.status === "approved") {
        return "!text-green-500"
    }
    if (paymentRequestStore.paymentRequest.form?.status === "pending") {
        return "!text-gray-500"
    }
    if (paymentRequestStore.paymentRequest.form?.status === "declined") {
        return "!text-red-500"
    }
    if (paymentRequestStore.paymentRequest.form?.status === "issued") {
        return "!text-blue-500"
    }
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
    <div class="bg-white rounded-lg px-2 relative" :class="props.border ? 'shadow border border-gray-200' : ''">
        <AccountingLoadScreen :is-loading="paymentRequestStore.isLoading.show" />
        <div class="flex justify-between items-center h-16 border-b px-4">
            <h2 class="text-xl text-gray-800">
                Payment Request Details
            </h2>
            <Icon v-if="props.target==='voucher'" class="text-4xl text-gray-400 cursor-pointer hover:text-red-500 active:text-red-600" name="iconoir:xmark" @click="emit('detach')" />
        </div>
        <div class="flex flex-col p-4 w-full">
            <div class="flex gap-4 border-b py-4 w-full">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">PRF No.</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ paymentRequestStore.paymentRequest.prf_no }}
                    </h4>
                </div>
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Payee</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ paymentRequestStore.paymentRequest.stakeholder?.name }}
                    </h4>
                </div>
            </div>
            <div class="flex gap-4 border-b py-4 w-full">
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Request Date</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ fullDate(paymentRequestStore.paymentRequest.request_date) }}
                    </h4>
                </div>
                <div class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Total</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ formatToCurrency(paymentRequestStore.paymentRequest.total) }}
                    </h4>
                </div>
            </div>
            <div class="flex gap-2 w-full justify-between py-4 border-b">
                <div v-if="paymentRequestStore.paymentRequest.description" class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Description</label>
                    <h4 class="font-bold text-gray-900 text-sm">
                        {{ paymentRequestStore.paymentRequest.description }}
                    </h4>
                </div>
                <div v-if="paymentRequestStore.paymentRequest.form" class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white">Status</label>
                    <h4 class="font-bold text-gray-900 text-sm" :class="statusColor">
                        {{ upperFirst(paymentRequestStore.paymentRequest.form?.status) }}
                    </h4>
                </div>
            </div>
            <div class="flex gap-2 w-full justify-between py-4">
                <div v-if="paymentRequestStore.paymentRequest.form?.status==='pending'" class="flex-1 gap-4">
                    <label class="block text-xs text-gray-900 dark:text-white font-bold mb-1">Action</label>
                    <div class="flex gap-2 items-center">
                        <button
                            class="flex items-center px-3 text-sm py-1 rounded-md bg-teal-400 hover:bg-teal-600 active:bg-teal-500 text-white"
                            @click="paymentRequestStore.approve"
                        >
                            <Icon name="iconoir:thumbs-up" class="mr-1 text-lg" />
                            Approve
                        </button>
                        <button
                            class="flex items-center px-3 text-sm py-1 rounded-md bg-orange-400 hover:bg-orange-600 active:bg-orange-500 text-white"
                            @click="paymentRequestStore.reject"
                        >
                            <Icon name="iconoir:thumbs-down" class="mr-1 text-lg" />
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <form action="">
            <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                <h2 class="text-center font-bold text-gray-800">
                    PAYMENT REQUEST DETAILS
                </h2>
                <table v-if="paymentRequestStore.paymentRequest.details.length > 0" class="w-full mt-6">
                    <thead>
                        <tr>
                            <th class="border-2 border-gray-800 text-xs w-1/3">
                                PARTICULARS
                            </th>
                            <th class="border-2 border-gray-800 text-xs">
                                Proj/Sec Code
                            </th>
                            <th class="border-2 border-gray-800 text-xs">
                                COST
                            </th>
                            <th class="border-2 border-gray-800 text-xs">
                                VAT
                            </th>
                            <th class="border-2 border-gray-800 text-xs">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="ae,i in paymentRequestStore.paymentRequest.details" :key="i" class="hover:bg-gray-100 cursor-pointer">
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ stakeholder(ae.stakeholder_id)?.name }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ ae.particulars }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ formatToCurrency(ae.cost) }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs">
                                {{ formatToCurrency(ae.vat) }}
                            </td>
                            <td class="border px-4 py-1 border-gray-800 text-xs font-bold">
                                {{ formatToCurrency(parseFloat(ae.cost) + parseFloat(ae.vat)) }}
                            </td>
                        </tr>
                        <tr>
                            <td class="text-center font-bold py-2">
                                TOTAL
                            </td>
                            <td />
                            <td class="border-b-2 border-black py-2 px-4">
                                {{ formatToCurrency(totalCost) }}
                            </td>
                            <td class="border-b-2 border-black py-2 px-4">
                                {{ formatToCurrency(totalVat) }}
                            </td>
                            <td class="border-b-2 border-black font-bold py-2 px-4">
                                {{ formatToCurrency(totalCost + totalVat) }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <i v-else class="text-center block mt-4 mb-2 text-gray-500">
                    There are no details.
                </i>
            </div>
        </form>
        <div v-if="props.target !== 'voucher'" class="flex justify-between w-full mb-8 gap-2 items-center mt-5">
            <button
                class="text-gray-700 self-start hover:text-blue-500 border-gray-700 mt-2"
                @click.prevent="navigate('/accounting/payment-request', 'create')"
            >
                <Icon name="ion:ios-arrow-thin-left" class="mr-1 text-2xl" />
                Back to create
            </button>
            <div class="flex gap-2">
                <button
                    class="text-white p-2 px-6 bg-blue-500 content-center rounded-md w-fit flex items-center"
                    @click="print"
                >
                    <Icon name="iconoir:printing-page" class="text-xl mr-2" />
                    Print
                </button>
                <button
                    class="text-white p-2 px-6 bg-green-500 content-center rounded-md w-fit flex items-center"
                    @click="navigate('/accounting/payment-request?edit=' + paymentRequestStore.paymentRequest.id, 'edit')"
                >
                    <Icon name="iconoir:edit" class="text-xl mr-2" />
                    Edit
                </button>
            </div>
        </div>

        <div v-else class="flex justify-between w-full mb-8 gap-2 items-center mt-5">
            <button
                class="text-gray-700 self-start hover:text-blue-500 border-gray-700 mt-2"
                @click.prevent="emit('backToList')"
            >
                <Icon name="ion:ios-arrow-thin-left" class="mr-1 text-2xl" />
                Back to List
            </button>
        </div>

        <!-- PRINT AREA  -->

        <div class="hidden">
            <AccountingPaymentrequestPrint />
        </div>
    </div>
</template>
<style scoped>
</style>
