<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"
const { voucherCash } = storeToRefs(useVoucherStore())
const voucherStore = useVoucherStore()

defineProps({
    entryData: {
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
    open: "info",
    unposted: "warning",
    posted: "success",
    void: "error"
})
const generateVoucher = async (data) => {
    await voucherStore.generateCashVoucherNo()
    voucherCash.value.stakeholder_id = data.payment_request.stakeholder_id
    voucherCash.value.account_id = data.account_id
    voucherCash.value.particulars = data.remarks
    voucherCash.value.stakeholderInformation = data.payment_request.stakeholder
    voucherCash.value.net_amount = data.payment_request.total
    voucherCash.value.amount_in_words = useAmountInWords(data.payment_request.total)
    voucherCash.value.details = data.details.map(detail => ({
        ...detail,
        debit: detail.credit,
        credit: detail.debit,
        stakeholder_id: detail.stakeholder ? detail.stakeholder.id : null
    }))
    voucherCash.value.journal_entry_id = data.id
    voucherCash.value.reference_no = data.reference_no
    showModal.value = false
}

const showModal = defineModel("showModal", { required: false, type: Boolean })
</script>

<template>
    <PsModal v-model:show-modal="showModal" title="">
        <template #body>
            <AccountingStatusRibbon :type="ribbonTypes[entryData?.status.toLowerCase()]" position="top-left" :status="entryData?.status" class="z-30" />
            <div class="p-2 py-4 flex gap-2 w-full mb-4">
                <span class="text-gray-900 text-4xl text-center w-full block flex-1">Journal Entry</span>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Journal No.: </span>
                    <span class="text-gray-900">{{ entryData?.journal_no }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Reference No.: </span>
                    {{ entryData?.reference_no }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Status: </span>
                    {{ entryData?.status }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Created by: </span>
                    {{ entryData?.created_by_user ?? "-" }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Journal Date: </span>
                    {{ entryData?.date_filed }}
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Description: </span>
                    {{ entryData?.payment_request?.description }}
                </div>
            </div>
            <div class="p-2 border border-gray-200 rounded-lg">
                <h2 class="text-xl text-gray-800 tex-center font-bold p-2">
                    Journal Entry Details
                </h2>
                <div class="overflow-x-auto">
                    <div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
                        <table class="min-w-full divide-y border border-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Accounts
                                    </th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subsidiary
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
                                <tr v-for="detail in entryData?.details" :key="detail.id">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.account?.account_name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.stakeholder?.name }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.debit > 0 ? formatToCurrency(detail?.debit) : "-" }}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            {{ detail?.credit > 0 ? formatToCurrency(detail?.credit) : "-" }}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <div class="flex gap-2 p-2 justify-end relative">
                <button
                    class="w-38 h-8 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-2 py-0 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                    @click="generateVoucher(entryData)"
                >
                    <Icon name="ic:baseline-send" color="white" class="w-5 h-5" />
                    Generate Cash Voucher
                </button>
            </div>
        </template>
    </PsModal>
</template>
