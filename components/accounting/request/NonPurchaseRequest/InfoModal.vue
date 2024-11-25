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

const paymentRequestStore = usePaymentRequestStore()
const { remarks } = storeToRefs(paymentRequestStore)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

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

</script>

<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">Payment Request</span>
                </div>
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
                    {{ paymentData?.total }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Status: </span>
                    {{ paymentData?.request_status }}
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
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Particulars
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Project/Section Code
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vat
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="detail in paymentData?.details" :key="detail.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.particulars }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.stakeholder.name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.vat }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.amount }}
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
        </template>
    </PsModal>
</template>
