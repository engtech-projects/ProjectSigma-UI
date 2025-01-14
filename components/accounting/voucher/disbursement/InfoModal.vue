<script setup>
import { storeToRefs } from "pinia"
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"

defineProps({
    voucherData: {
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
const ribbonTypes = ref({
    pending: "warning",
    approved: "success",
    denied: "error"
})

const voucherStore = useVoucherStore()
const { remarks } = storeToRefs(voucherStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

watch(showModal, (newVal) => {
    if (!newVal) {
        printPreview.value = false
    }
})

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await voucherStore.approveDisbursementVoucher(id)
        snackbar.add({
            type: "success",
            text: voucherStore.successMessage
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
        await voucherStore.denyDisbursementVoucher(id)
        snackbar.add({
            type: "success",
            text: voucherStore.successMessage
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

</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <AccountingStatusRibbon :type="ribbonTypes[voucherData?.request_status.toLowerCase()]" position="top-left" :status="voucherData?.request_status" class="z-30" />
            <div v-if="!printPreview" class="px-4">
                <AccountingCommonTabsMainContainer :justify-end="true" class="w-full">
                    <template #tab-titles>
                        <AccountingCommonTabsTabTitle
                            title="Voucher Info"
                            target-id="voucherInfo"
                        />
                        <AccountingCommonTabsTabTitle
                            title="Journal Entry Info"
                            target-id="journalEntryInfo"
                        />
                        <AccountingCommonTabsTabTitle
                            title="Payment Request Info"
                            target-id="paymentRequestInfo"
                        />
                    </template>
                    <template #tab-containers>
                        <AccountingCommonTabsTabContainer id="voucherInfo">
                            <AccountingCommonInfoModalTemplateDisbursementVoucherInfo :voucher-data="voucherData" />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="journalEntryInfo">
                            <AccountingCommonInfoModalTemplateJournalEntryInfo :entry-data="voucherData?.journal_entry" />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="paymentRequestInfo">
                            <AccountingCommonInfoModalTemplatePaymentRequestInfo :payment-data="voucherData?.payment_request" />
                        </AccountingCommonTabsTabContainer>
                    </template>
                </AccountingCommonTabsMainContainer>
            </div>
            <LayoutPrint v-else>
                <AccountingVoucherDisbursementPrintForm :data="voucherData" />
            </LayoutPrint>
        </template>
        <template #footer>
            <div v-if="voucherData?.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="voucherData.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
            <AccountingCommonButtonPrintPreview v-else v-model:print-preview="printPreview" />
        </template>
    </PsModal>
</template>
