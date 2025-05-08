<script setup>
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
import { useApprovalStore, APPROVAL_PAYMENT_REQUEST_NPO } from "@/stores/hrms/setup/approvals"
import { useWithholdingTaxStore } from "~/stores/accounting/setup/withholdingtax"
const paymentRequestStore = usePaymentRequestStore()
const { paymentRequest, vat, paymentRequestAttachmentData } = storeToRefs(paymentRequestStore)
const snackbar = useSnackbar()
const approvals = useApprovalStore()
const withHoldingTaxStore = useWithholdingTaxStore()
await paymentRequestStore.getVat()

paymentRequest.value.approvals = await approvals.getApprovalByName(APPROVAL_PAYMENT_REQUEST_NPO)
onMounted(() => {
    paymentRequestStore.generatePrNo()
    withHoldingTaxStore.getAllWithholdingTaxes()
})
defineProps({
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})
const details = ref({
    stakeholder_id: null,
    particulars: "",
    stakeholderInformation: {},
    cost: 0,
    vat: vat.value
})
const handleFileUpload = async (event) => {
    if (event.target.files[0] !== undefined) {
        const attachmentFile = event.target.files[0]
        paymentRequestAttachmentData.value.attachment_files = [
            ...paymentRequestAttachmentData.value.attachment_files,
            attachmentFile
        ]
        await paymentRequestStore.uploadAttachments()
    }
}
const addPaymentRequest = async () => {
    try {
        await paymentRequestStore.addPaymentRequest()
        if (paymentRequest.value.successMessage) {
            snackbar.add({
                type: "success",
                text: paymentRequest.value.successMessage
            })
        } else {
            snackbar.add({
                type: "error",
                text: paymentRequest.value.errorMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: paymentRequest.value.errorMessage
        })
    }
}

const computeDetails = () => {
    paymentRequest.value.total_vat_amount = paymentRequest.value.details.reduce((acc, item) => acc + parseFloat(item.total_vat_amount), 0)
    paymentRequest.value.total = paymentRequest.value.details.reduce((acc, item) => acc + parseFloat(item.amount), 0)
}
const removeDetails = (index) => {
    paymentRequest.value.details.splice(index, 1)
    computeDetails()
}
const addDetails = () => {
    details.value = {
        stakeholder_id: null,
        particulars: "",
        stakeholderInformation: {},
        cost: 0,
        vat: vat.value
    }
    paymentRequest.value.details.push(details.value)
}
paymentRequest.value.total_vat_amount = computed(() => {
    return paymentRequest.value.details.reduce((acc, item) => acc + parseFloat(item.total_vat_amount), 0)
})
paymentRequest.value.total = computed(() => {
    return paymentRequest.value.details.reduce((acc, item) => acc + parseFloat(item.amount), 0)
})
const selectStakeholder = (stakeholder) => {
    paymentRequest.value.stakeholderInformation = stakeholder
    paymentRequest.value.stakeholder_id = stakeholder.id
}
</script>
<template>
    <LayoutBoards title="Payment Request Form (Non-Purchase)" :loading="paymentRequest.isLoading" class="w-90">
        <div>
            <form enctype="multipart/form-data" @submit.prevent="addPaymentRequest">
                <div class="flex flex-col gap-16 pt-8 sticky">
                    <h1 class="text-2xl text-center font-bold">
                        PAYMENT REQUEST FORM
                    </h1>
                    <div class="w-full">
                        <div class="w-full flex justify-between">
                            <div class="w-full">
                                <div class="w-1/3 flex flex-col gap-2">
                                    <template v-if="paymentRequestAttachmentData.attachment_files.length > 0">
                                        <div
                                            v-for="(attachment, index) in paymentRequestAttachmentData.attachment_files"
                                            :key="index"
                                            class="p-2 bg-gray-400 text-white"
                                        >
                                            <div class="w-full">
                                                {{ attachment.name.length > 20 ? attachment.name.slice(0, 20) + '...' : attachment.name }}
                                            </div>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p>
                                            No attachments yet
                                        </p>
                                    </template>
                                </div>
                            </div>
                            <div class="w-1/5">
                                <label for="floating_payment_request_attachment" class="block  text-sm font-medium text-gray-900 dark:text-white">Payment Request Proof of attachment</label>
                                <input
                                    id="floating_payment_request_attachment"
                                    formenctype="multipart/form-data"
                                    class="block w-full mb-1 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    aria-describedby="file_input_help"
                                    type="file"
                                    @change="handleFileUpload"
                                >
                                <p class="flex justify-center mx-auto text-xs text-gray-500 dark:text-gray-300 uppercase">
                                    pdf/jpg/jpeg
                                </p>
                            </div>
                        </div>
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
                                    disabled
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
                                    v-model="paymentRequest.total_vat_amount"
                                    disabled
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
                                <!-- <AccountingCommonSelectStakeHolder
                                    v-model:stakeholder-info="paymentRequest.stakeholderInformation"
                                    v-model:selected-type="paymentRequest.stakeolder_type"
                                    class="w-full"
                                    :selected-id="paymentRequest.stakeholder_id"
                                    :filter-options="['employee', 'supplier', 'payee']"
                                /> -->
                                <AccountingCommonSelectStakeholderSelect
                                    :stakeholder-id="paymentRequest.stakeholder_id"
                                    :stakeholder="paymentRequest.stakeholderInformation"
                                    :style="'z-index:' + (10 + (itemCount - index))"
                                    :select-options="['employee', 'supplier', 'payee']"
                                    @select="selectStakeholder"
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
                        <div class="py-2">
                            <div class="w-full flex gap-2 ">
                                <label
                                    for="description"
                                    class="text-xs italic"
                                >Apply With Holding Tax</label>
                                <input id="monday" v-model="paymentRequest.isWithHolingTax" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                            </div>
                            <div v-if="paymentRequest.isWithHolingTax">
                                <div class="w-full">
                                    <label
                                        for="withholding_tax"
                                        class="text-xs italic"
                                    >Withholding Tax</label>
                                    <select
                                        id="withholding_tax"
                                        v-model="paymentRequest.withholding_tax_id"
                                        class="w-full rounded-lg"
                                    >
                                        <option value="">
                                            -Select-
                                        </option>
                                        <option
                                            v-for="(wt, index) in withHoldingTaxStore.withHoldingTaxSelectList"
                                            :key="index"
                                            :value="index"
                                        >
                                            {{ wt }}
                                        </option>
                                    </select>
                                </div>
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
                            <AccountingRequestNonPurchaseRequestDetailItem
                                v-for="(_detail, idx) in paymentRequest.details"
                                :key="'detail'+idx"
                                v-model="paymentRequest.details[idx]"
                                :index="idx"
                                @delete-item="removeDetails(idx)"
                                @compute-details="computeDetails"
                            />
                        </div>
                        <span v-if="paymentRequest.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                    <div class="w-full">
                        <HrmsCommonRequestedBy />
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                        <div>
                            <HrmsSetupApprovalsList
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
