<script setup>
import { storeToRefs } from "pinia"
import { usePaymentRequestStore } from "@/stores/accounting/requests/paymentrequest"

defineProps({
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
const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })
const printPreview = ref(false)

const paymentRequestStore = usePaymentRequestStore()
const { remarks } = storeToRefs(paymentRequestStore)

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
            <div v-if="!printPreview" class="px-4">
                <AccountingCommonInfoModalTemplatePaymentRequestInfo :payment-data="paymentData" />
            </div>
            <LayoutPrint v-else>
                <AccountingRequestNonPurchaseRequestPrintForm :data="paymentData" />
            </LayoutPrint>
        </template>
        <template #footer>
            <div v-if="paymentData?.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="paymentData.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
            <AccountingCommonButtonPrintPreview v-else v-model:print-preview="printPreview" />
        </template>
    </PsModal>
</template>
