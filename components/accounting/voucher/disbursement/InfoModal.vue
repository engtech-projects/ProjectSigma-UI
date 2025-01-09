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
                <div class="p-2 py-4 flex gap-2 w-full">
                    <span class="text-gray-900 text-4xl text-center w-full block">Disbursement Voucher</span>
                </div>
                <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light">DV Number: </span>
                        <span class="text-gray-900">{{ voucherData?.voucher_no }}</span>
                    </div>
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light">Amount: </span>
                        {{ formatToCurrency(voucherData?.net_amount) }}
                    </div>
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light">Status: </span>
                        {{ voucherData?.request_status }}
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light">Date Encoded: </span>
                        {{ voucherData?.date_encoded }}
                    </div>
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light">Voucher Date: </span>
                        {{ voucherData?.voucher_date }}
                    </div>
                </div>
                <div class="p-2 border border-gray-200 rounded-lg">
                    <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                        Voucher Details
                    </h2>
                    <div class="overflow-x-auto">
                        <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                            <table class="min-w-full divide-y border border-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Account Name
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Account Number
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Debit
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Credit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="detail in voucherData?.details" :key="detail.id">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                {{ detail?.account?.account_name }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                {{ detail?.account?.account_number }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                {{ formatToCurrency(detail?.debit) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">
                                                {{ formatToCurrency(detail?.credit) }}
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="w-full">
                    <LayoutApprovalsListView :approvals="voucherData?.approvals" />
                </div>
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
