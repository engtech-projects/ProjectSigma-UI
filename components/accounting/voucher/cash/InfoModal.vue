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
const ribbonTypes = ref({
    pending: "warning",
    approved: "success",
    denied: "error"
})
const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })
const printPreview = ref(false)

const voucherStore = useVoucherStore()
const { remarks } = storeToRefs(voucherStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await voucherStore.approveCashVoucher(id)
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
        await voucherStore.denyCashVoucher(id)
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

watch(showModal, (newVal) => {
    if (!newVal) {
        printPreview.value = false
    }
})

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
                    </template>
                    <template #tab-containers>
                        <AccountingCommonTabsTabContainer id="voucherInfo">
                            <AccountingCommonInfoModalTemplateCashVoucherInfo :voucher-data="voucherData" />
                        </AccountingCommonTabsTabContainer>
                        <AccountingCommonTabsTabContainer id="journalEntryInfo">
                            <AccountingCommonInfoModalTemplateJournalEntryInfo :entry-data="voucherData?.journal_entry" />
                        </AccountingCommonTabsTabContainer>
                    </template>
                </AccountingCommonTabsMainContainer>
            </div>

            <LayoutPrint v-else>
                <AccountingVoucherCashPrintForm :data="voucherData" />
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
            <div v-else class="flex gap-2 justify-end w-full p-8">
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
