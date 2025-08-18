<script setup>
import { storeToRefs } from "pinia"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"
const config = useRuntimeConfig()

const props = defineProps({
    paymentData: {
        type: Object,
        required: false,
        default: null
    },
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})
const showModal = defineModel("showModal", { required: false, type: Boolean })
const printPreview = ref(false)

const paymentRequestStore = usePaymentRequestStore()
const { remarks, paymentRequest } = storeToRefs(paymentRequestStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const ribbonTypes = ref({
    pending: "warning",
    approved: "success",
    denied: "error"
})
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await paymentRequestStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: paymentRequestStore.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}

const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await paymentRequestStore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: paymentRequestStore.successMessage
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const totalCost = computed(() => {
    let total = 0
    props.paymentData?.details?.forEach((d) => {
        total += parseFloat(d?.cost)
    })
    return total
})
const totalVatAmount = computed(() => {
    let total = 0
    props.paymentData?.details?.forEach((d) => {
        total += parseFloat(d?.total_vat_amount)
    })
    return total
})
const totalAmount = computed(() => {
    return totalCost.value + totalVatAmount.value
})
const useAsNewRequest = (requestData) => {
    const approvals = paymentRequest.value.approvals
    const mapData = { ...requestData }
    if (mapData.stakeholder) {
        mapData.stakeholderInformation = mapData.stakeholder
        delete mapData.stakeholder
    }
    if (mapData.details) {
        mapData.details = mapData.details.map((detail) => {
            const mapDetail = { ...detail }
            if (mapDetail.stakeholder) {
                mapDetail.stakeholderInformation = mapDetail.stakeholder
                delete mapDetail.stakeholder
            }
            return mapDetail
        })
    }
    Object.assign(paymentRequest.value, { request_date: null, ...mapData })
    paymentRequest.value.approvals = approvals
    showModal.value = false
    document.querySelector("[data-tabs-target='#npoForm']").click()
}
watch(showModal, (newVal) => {
    if (!newVal) {
        printPreview.value = false
    }
})
</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <AccountingStatusRibbon :type="ribbonTypes[paymentData?.request_status.toLowerCase()]" position="top-left" :status="paymentData?.request_status" class="z-30" />
            <div v-if="!printPreview" class="flex gap-2 px-4">
                <div class="w-3/4">
                    <div class="p-2 py-4 flex gap-2 w-full mb-4">
                        <span class="text-gray-900 text-4xl text-center w-full block flex-1">Payment Request</span>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">PRF Number: </span>
                            <span class="text-gray-900">{{ paymentData?.prf_no }}</span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Payee: </span>
                            {{ paymentData?.stakeholder?.name }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Amount: </span>
                            {{ accountingCurrency(paymentData?.total) }}
                        </div>
                    </div>
                    <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Prepared by: </span>
                            {{ paymentData?.created_by_user }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Prepared on: </span>
                            {{ paymentData?.date_filed }}
                        </div>
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Status: </span>
                            {{ paymentData?.request_status }}
                        </div>
                    </div>
                    <div v-if="paymentData?.with_holding_tax">
                        <span class="text-teal-600 text-light">Withholding Tax Information </span>
                        <div class="flex gap-4">
                            <div>
                                Percentage: {{ paymentData?.with_holding_tax.wtax_percentage }}
                            </div>
                            <div>
                                Type: {{ paymentData?.with_holding_tax.vat_type }}
                            </div>
                        </div>
                    </div>
                    <div class="grid md:grid-cols-1 gap-2 md:justify-between">
                        <div class="p-2 flex gap-2">
                            <span class="text-teal-600 text-light">Description/Remarks: </span>
                        </div>
                        <div class="p-2 flex gap-2">
                            <p>
                                {{ paymentData?.description }}
                            </p>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div>
                            <NuxtLink
                                class="flex items-center gap-2 p-2 border border-green-600 rounded-lg hover:bg-green-100"
                                :to="config.public.ACCOUNTING_API_URL + '/document-viewer?id=' + paymentData?.id"
                                target="_blank"
                            >
                                <Icon name="ic:sharp-file-download" color="green" class="w-4 h-4" />
                                View Attachment File
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="p-2 border border-gray-200 rounded-lg">
                        <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                            Payment Request Details
                        </h2>
                        <div class="overflow-x-auto">
                            <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                                <table class="min-w-full divide-y border border-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                                Particulars
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                                Project/Section Code
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                                Cost
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                                Total Vat
                                            </th>
                                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-950 uppercase tracking-wider">
                                                Total Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="detail in paymentData?.details" :key="detail.id">
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600">
                                                    {{ detail?.particulars }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600">
                                                    {{ detail?.stakeholder.name }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600">
                                                    {{ accountingCurrency(detail?.cost) }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600">
                                                    {{ accountingCurrency(detail?.total_vat_amount) }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600">
                                                    {{ accountingCurrency(detail?.amount) }}
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap" colspan="2">
                                                <div class="text-sm text-gray-600 font-bold">
                                                    TOTAL
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600 font-bold">
                                                    {{ accountingCurrency(totalCost) }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600 font-bold">
                                                    {{ accountingCurrency(totalVatAmount) }}
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <div class="text-sm text-gray-600 font-bold">
                                                    {{ accountingCurrency(totalAmount) }}
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <LayoutApprovalsListView :approvals="paymentData?.approvals" />
                    </div>
                    <div v-if="paymentData.next_approval && useCheckIsCurrentUser(paymentData.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
                        <HrmsCommonApprovalDenyButton
                            v-model:deny-remarks="remarks"
                            :request-id="paymentData.id"
                            @approve="approvedRequest"
                            @deny="denyRequest"
                        />
                    </div>
                </div>
                <div class="w-1/4">
                    <AccountingCommonTransactionFlow
                        :transaction-option="'view'"
                        :transaction-flow-model-list="paymentData.transaction_flow"
                        @close-modal="closeViewModal"
                    />
                </div>
            </div>
            <LayoutPrint v-else>
                <AccountingRequestNonPurchaseRequestPrintView :data="paymentData" />
            </LayoutPrint>
        </template>
        <template #footer>
            <div class="flex gap-2 justify-end w-full p-8">
                <button v-if="!printPreview && paymentData.request_status === AccountingRequestStatus.denied" class="flex items-center gap-1 justify-center bg-green-600 p-2 hover:bg-green-900 text-white rounded-md w-32 text-sm" @click="useAsNewRequest(paymentData)">
                    USE AS NEW REQUEST
                </button>
                <button v-if="!printPreview" class="flex items-center gap-1 justify-center bg-gray-600 p-2 hover:bg-gray-900 text-white rounded-md w-32 text-sm" @click="printPreview=true">
                    <Icon name="iconoir:printing-page" />
                    Print Preview
                </button>
                <button v-else class="flex items-center gap-1 justify-center bg-orange-600 p-2 hover:bg-orange-900 text-white rounded-md w-32 text-sm" @click="printPreview=false">
                    <Icon name="iconoir:printing-page" />
                    Hide Preview
                </button>
            </div>
        </template>
    </PsModal>
</template>
