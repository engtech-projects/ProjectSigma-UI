<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"
import { useJournalStore } from "~/stores/accounting/journals/journal"
import { useApprovalStore, APPROVAL_DISBURSEMENT_VOUCHER } from "@/stores/hrms/setup/approvals"
const voucherStore = useVoucherStore()
const journalStore = useJournalStore()
const { voucherDisbursement } = storeToRefs(voucherStore)
const snackbar = useSnackbar()
const approvals = useApprovalStore()

voucherDisbursement.value.approvals = await approvals.getApprovalByName(APPROVAL_DISBURSEMENT_VOUCHER)
defineProps({
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})
const addVoucherRequest = async () => {
    try {
        await voucherStore.addVoucherDisbursement()
        journalStore.getForDisbursementVoucherEntries()
        if (voucherDisbursement.value.successMessage) {
            snackbar.add({
                type: "success",
                text: voucherDisbursement.value.successMessage
            })
        } else {
            snackbar.add({
                type: "error",
                text: voucherDisbursement.value.errorMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: voucherDisbursement.value.errorMessage
        })
    }
}
const removeDetails = (index) => {
    voucherDisbursement.value.details.splice(index, 1)
}
voucherDisbursement.value.total_vat_amount = computed(() => {
    return voucherDisbursement.value.details.reduce((acc, item) => acc + parseFloat(item.total_vat_amount), 0)
})
voucherDisbursement.value.total = computed(() => {
    return voucherDisbursement.value.details.reduce((acc, item) => acc + parseFloat(item.amount), 0)
})
voucherDisbursement.value.total_debit = computed(() => {
    return voucherDisbursement.value.details.reduce((acc, item) => acc + parseFloat(item.debit), 0)
})
voucherDisbursement.value.total_credit = computed(() => {
    return voucherDisbursement.value.details.reduce((acc, item) => acc + parseFloat(item.credit), 0)
})
</script>
<template>
    <LayoutBoards title="Disbursement Voucher Form" :loading="voucherDisbursement.isLoading" class="w-90">
        <div>
            <form @submit.prevent="addVoucherRequest">
                <div class="flex flex-col gap-16 pt-8 sticky">
                    <h1 class="text-2xl text-center font-bold">
                        DISBURSEMENT VOUCHER FORM
                    </h1>
                    <div class="w-full">
                        <div class="flex gap-2">
                            <div class="w-full">
                                <label
                                    for="dv"
                                    class="text-xs italic"
                                >DV Number</label>
                                <input
                                    id="dv"
                                    v-model="voucherDisbursement.voucher_no"
                                    type="text"
                                    class="w-full rounded-lg"
                                    required
                                >
                            </div>
                            <div class="w-full">
                                <div>
                                    <label
                                        for="total"
                                        class="text-xs italic"
                                    >Total Amount</label>
                                    <input
                                        id="total"
                                        v-model="voucherDisbursement.net_amount"
                                        type="number"
                                        disabled
                                        class="w-full rounded-lg"
                                        required
                                    >
                                </div>
                            </div>
                            <div class="w-full">
                                <div>
                                    <label
                                        for="date"
                                        class="text-xs italic"
                                    >Date</label>
                                    <input
                                        id="date"
                                        v-model="voucherDisbursement.voucher_date"
                                        type="date"
                                        class="w-full rounded-lg"
                                        required
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <label
                                    for="payee"
                                    class="text-xs italic"
                                >Payee</label>
                                <p>
                                    {{ voucherDisbursement.stakeholderInformation.name }}
                                </p>
                            </div>
                            <div>
                                <label
                                    for="dv"
                                    class="text-xs italic"
                                >Voucher Type</label>
                                <p>
                                    Disbursement
                                </p>
                            </div>
                            <div>
                                <label
                                    for="dv"
                                    class="text-xs italic"
                                >Referrence No</label>
                                <p>
                                    {{ voucherDisbursement.reference_no }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div class="w-full">
                                <label
                                    for="description"
                                    class="text-xs italic"
                                >Particulars/Description</label>
                                <textarea
                                    id="description"
                                    v-model="voucherDisbursement.particulars"
                                    class="w-full rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-bold text-center">
                                DISBURSEMENT VOUCHER DETAILS
                            </h2>
                        </div>
                        <div v-show="voucherDisbursement.details.length > 0" class="flex flex-col bg-gray-100 rounded-lg gap-2">
                            <AccountingVoucherDisbursementDetailItem
                                v-for="(_detail, idx) in voucherDisbursement.details"
                                :key="'detail'+idx"
                                v-model="voucherDisbursement.details[idx]"
                                :index="idx"
                                @delete-item="removeDetails(idx)"
                            />
                            <div class="w-full grid grid-cols-5 gap-2 bg-white p-3 rounded-lg shadow-sm">
                                <div class="flex flex-col">
                                    -
                                </div>
                                <div class="flex flex-col">
                                    -
                                </div>
                                <div class="flex flex-col">
                                    -
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-500">Total Debit</span>
                                    <span class="font-medium text-right">{{ accountingCurrency(voucherDisbursement.net_amount) }}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-500">Total Credit</span>
                                    <span class="font-medium text-right">{{ accountingCurrency(voucherDisbursement.net_amount) }}</span>
                                </div>
                            </div>
                        </div>
                        <span v-if="voucherDisbursement.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                    <div class="w-full">
                        <HrmsCommonRequestedBy />
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                        <div>
                            <HrmsSetupApprovalsList
                                v-for="(approv, apr) in voucherDisbursement.approvals"
                                :key="'hrmsetupapprovallist'+apr"
                                v-model="voucherDisbursement.approvals[apr]"
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
