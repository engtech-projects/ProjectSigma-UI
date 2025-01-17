<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"
import { useJournalStore } from "~/stores/accounting/journals/journal"
import { useApprovalStore, APPROVAL_CASH_VOUCHER } from "@/stores/hrms/setup/approvals"
const voucherStore = useVoucherStore()
const journalStore = useJournalStore()
const { voucherCash } = storeToRefs(voucherStore)
const snackbar = useSnackbar()
const approvals = useApprovalStore()

voucherCash.value.approvals = await approvals.getApprovalByName(APPROVAL_CASH_VOUCHER)
defineProps({
    fillable: {
        type: Boolean,
        required: false,
        default: false
    }
})
const addVoucherRequest = async () => {
    try {
        await voucherStore.addVoucherCash()
        await journalStore.getForCashVoucherEntries()
        if (voucherCash.value.successMessage) {
            snackbar.add({
                type: "success",
                text: voucherCash.value.successMessage
            })
        } else {
            snackbar.add({
                type: "error",
                text: voucherCash.value.errorMessage
            })
        }
    } catch {
        snackbar.add({
            type: "error",
            text: voucherCash.value.errorMessage
        })
    }
}
const removeDetails = (index) => {
    voucherCash.value.details.splice(index, 1)
}
voucherCash.value.total_vat_amount = computed(() => {
    return voucherCash.value.details.reduce((acc, item) => acc + parseFloat(item.total_vat_amount), 0)
})
voucherCash.value.total = computed(() => {
    return voucherCash.value.details.reduce((acc, item) => acc + parseFloat(item.amount), 0)
})
voucherCash.value.total_debit = computed(() => {
    return voucherCash.value.details.reduce((acc, item) => acc + parseFloat(item.debit), 0)
})
voucherCash.value.total_credit = computed(() => {
    return voucherCash.value.details.reduce((acc, item) => acc + parseFloat(item.credit), 0)
})
</script>
<template>
    <LayoutBoards title="" :loading="voucherCash.isLoading" class="w-90">
        <div>
            <form @submit.prevent="addVoucherRequest">
                <div class="flex flex-col gap-16 pt-8 sticky">
                    <h1 class="text-2xl text-center font-bold">
                        CASH VOUCHER FORM
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
                                    v-model="voucherCash.voucher_no"
                                    type="text"
                                    class="w-full rounded-lg"
                                    required
                                >
                                <label
                                    for="dv"
                                    class="text-xs italic"
                                >Voucher Type</label>
                                <p>
                                    Disbursement
                                </p>
                            </div>
                            <div class="w-full">
                                <div>
                                    <label
                                        for="total"
                                        class="text-xs italic"
                                    >Total Amount</label>
                                    <input
                                        id="total"
                                        v-model="voucherCash.net_amount"
                                        type="number"
                                        disabled
                                        class="w-full rounded-lg"
                                        required
                                    >
                                </div>
                                <div>
                                    <label
                                        for="total"
                                        class="text-xs italic"
                                    >Check No.</label>
                                    <p>
                                        {{ voucherCash.amount_in_words }}
                                    </p>
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
                                        v-model="voucherCash.voucher_date"
                                        type="date"
                                        class="w-full rounded-lg"
                                        required
                                    >
                                </div>
                                <div>
                                    <label
                                        for="dv"
                                        class="text-xs italic"
                                    >Refference No.</label>
                                    <p class="py-2">
                                        {{ voucherCash.reference_no }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label
                                    for="payee"
                                    class="text-xs italic"
                                >Payee</label>
                                <p>
                                    {{ voucherCash.stakeholderInformation.name }}
                                </p>
                            </div>
                            <div>
                                <label
                                    for="total"
                                    class="text-xs italic"
                                >Check No.</label>
                                <input
                                    id="total"
                                    v-model="voucherCash.check_no"
                                    type="text"
                                    class="w-full rounded-lg"
                                    required
                                >
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
                                    v-model="voucherCash.particulars"
                                    class="w-full rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between">
                            <h2 class="text-xl font-bold text-center">
                                CASH VOUCHER DETAILS
                            </h2>
                        </div>
                        <div v-show="voucherCash.details.length > 0" class="flex flex-col bg-gray-100 rounded-lg gap-2">
                            <AccountingVoucherCashDetailItem
                                v-for="(_detail, idx) in voucherCash.details"
                                :key="'detail'+idx"
                                v-model="voucherCash.details[idx]"
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
                                    <span class="font-medium text-right">{{ voucherCash.total_debit }}</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-xs text-gray-500">Total Credit</span>
                                    <span class="font-medium text-right">{{ voucherCash.total_credit }}</span>
                                </div>
                            </div>
                        </div>
                        <span v-if="voucherCash.details.length === 0" class="block text-center text-gray-600">
                            No entries yet.
                        </span>
                    </div>
                    <div class="w-full">
                        <HrmsCommonRequestedBy />
                        <label for="approved_by" class="block text-sm font-medium text-gray-900 dark:text-white">Approvals</label>
                        <div>
                            <AccountingSetupApprovalsList
                                v-for="(approv, apr) in voucherCash.approvals"
                                :key="'hrmsetupapprovallist'+apr"
                                v-model="voucherCash.approvals[apr]"
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
