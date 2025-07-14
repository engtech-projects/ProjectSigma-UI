<script setup>
import { storeToRefs } from "pinia"
import { usePayrollRequestStore } from "@/stores/accounting/requests/payrollrequest"

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
const showModal = defineModel("showModal", { required: false, type: Boolean })
const printPreview = ref(false)

const payrollRequestStore = usePayrollRequestStore()
const { remarks } = storeToRefs(payrollRequestStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await payrollRequestStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: payrollRequestStore.successMessage
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
const ribbonTypes = ref({
    pending: "warning",
    approved: "success",
    denied: "error"
})
const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await payrollRequestStore.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: payrollRequestStore.successMessage
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
                <div class="p-2 py-4 flex gap-2 w-full mb-4">
                    <span class="text-gray-900 text-4xl text-center w-full block flex-1">Payroll Request Form</span>
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
                        {{ useFormatCurrency(paymentData?.total) }}
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
                                            Description
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
                                                {{ detail?.particulars ?? '' }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-600">
                                                {{ detail?.stakeholder?.name ?? '' }}
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <LayoutPrint v-else>
                <!-- <AccountingRequestPayrollRequestPrintForm :data="paymentData" /> -->
                <AccountingRequestPayrollRequestPrintView :data="paymentData" />
            </LayoutPrint>
        </template>
        <template #footer>
            <div v-if="paymentData.next_approval && useCheckIsCurrentUser(paymentData.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
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
