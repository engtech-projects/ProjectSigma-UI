<script lang="ts" setup>
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/setup/accountgroups"
import { useVoucherStore } from "~/stores/accounting/vouchers/voucher"
import { useBookStore } from "~/stores/accounting/setup/book"

const { list: payeeList } = storeToRefs(useStakeHolderStore())
const accountGroupStore = useAccountGroupStore()
const voucherStore = useVoucherStore()
voucherStore.generateVoucherNumber("CV")
const bookStore = useBookStore()
const emit = defineEmits(["detach"])
const entriesError = ref(false)

const snackbar = useSnackbar()

async function handleSubmit () {
    if (voucherStore.voucher.details.length > 0) {
        try {
            voucherStore.voucher.book_id = bookStore.cash.id
            await voucherStore.createVoucher()
            if (voucherStore.errorMessage !== "") {
                voucherStore.isLoading.create = false
                snackbar.add({
                    type: "error",
                    text: voucherStore.errorMessage
                })
            } else {
                voucherStore.isLoading.create = false
                if (voucherStore.voucherClone) {
                    await voucherStore.updateVoucherStatus("completed", voucherStore.voucherClone.id)
                }
                snackbar.add({
                    type: "success",
                    text: voucherStore.successMessage
                })
                emit("detach")
                voucherStore.reset()
            }
        } catch (error) {
        }
    } else {
        entriesError.value = true
    }
}
const amount = computed(() => {
    return voucherStore.voucher.net_amount
})
watch(amount, (newAmount) => {
    voucherStore.voucher.amount_in_words = amountToWords(newAmount)
})
onMounted(() => {
    voucherStore.reset()
    voucherStore.voucher.voucher_date = dateToString(new Date())
    voucherStore.voucher.date_encoded = dateToString(new Date())
    voucherStore.voucher.net_amount = 0
})
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="bg-white shadow rounded-lg border border-gray-200 px-2 relative">
            <div v-if="voucherStore.isLoading.create" class="absolute z-50 bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Cash Voucher
                </h2>
            </div>
            <div class="flex flex-col gap-3 p-4 w-full">
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="voucherNo" class="block text-sm font-medium text-gray-900 dark:text-white">Voucher No.</label>
                        <input id="voucherNo" v-model="voucherStore.voucher.voucher_no" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex flex-col relative flex-1">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-gray-900 dark:text-white">Payee</label>
                            <AccountingSelectSearch
                                class="z-50 bg-gray-50 border-gray-200"
                                :options="payeeList"
                                title="name"
                                opid="id"
                                :disabled="true"
                                :selected-id="voucherStore.voucher.stakeholder_id"
                                @select="voucherStore.voucher.stakeholder_id = $event.id"
                            />
                        </div>
                        <input
                            v-model="voucherStore.voucher.stakeholder_id"
                            type="text"
                            class="focus:ring-0 text-white absolute left-0 bottom-0 bg-transparent border-none h-[1px] p-0 w-fill"
                            required
                        >
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="dateEncoded" class="block text-sm font-medium text-gray-900 dark:text-white">Encoded Date</label>
                        <input
                            id="dateEncoded"
                            v-model="voucherStore.voucher.date_encoded"
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="dateCreate" class="block text-sm font-medium text-gray-900 dark:text-white">Created Date</label>
                        <input
                            id="dateCreate"
                            v-model="voucherStore.voucher.voucher_date"
                            type="date"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="netAmount" class="block text-sm font-medium text-gray-900 dark:text-white">Net Amount</label>
                        <input
                            id="netAmount"
                            v-model="voucherStore.voucher.net_amount"
                            type="number"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            disabled
                        >
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="amountWords" class="block text-sm font-medium text-gray-900 dark:text-white">Amount in words</label>
                        <input
                            id="amountWords"
                            v-model="voucherStore.voucher.amount_in_words"
                            type="text"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            disabled
                        >
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-between">
                    <div class="flex flex-col relative flex-1">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-gray-900 dark:text-white">Account</label>
                            <AccountingSelectSearch
                                id="expenseAccount"
                                class="bg-gray-50 border-gray-200"
                                :options="accountGroupStore.accountGroup.accounts"
                                :selected-id="voucherStore.voucher.account_id"
                                title="account_name"
                                :disabled="true"
                                opid="id"
                                @select="voucherStore.voucher.account_id = $event.id"
                            />
                        </div>
                        <input
                            v-model="voucherStore.voucher.account_id"
                            type="text"
                            class="focus:ring-0 text-white absolute left-0 bottom-0 bg-transparent border-none h-[1px] p-0 w-fill"
                            required
                            disabled
                        >
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="checkNo" class="block text-sm font-medium text-gray-900 dark:text-white">Check No.</label>
                        <input id="checkNo" v-model="voucherStore.voucher.check_no" type="text" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-between">
                    <div class="flex-1">
                        <label for="referenceNo" class="block text-sm font-medium text-gray-900 dark:text-white">Reference No.</label>
                        <input id="referenceNo" v-model="voucherStore.voucher.reference_no" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                    </div>
                    <div class="flex-1" />
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="referenceNo" class="block text-sm font-medium text-gray-900 dark:text-white">Particulars</label>
                        <textarea v-model="voucherStore.voucher.particulars" class="bg-gray-50 border h-32 resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled />
                    </div>
                </div>
            </div>
            <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8" :class="entriesError ? '!bg-red-200' : ''">
                <h2 class="text-center font-bold text-gray-800">
                    ACCOUNTING ENTRIES
                </h2>
                <div class="flex flex-col w-full gap-2 mt-4">
                    <div v-for="ac,i in voucherStore.voucher.details" :key="i" class="flex gap-1 w-full items-end">
                        <div class="flex flex-col relative flex-1">
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Accounts</label>
                                <AccountingSelectSearch
                                    id="expenseAccount"
                                    v-model="ac.account_id"
                                    class="bg-gray-50 border-gray-200"
                                    :class="'z-' + (30 - i)"
                                    height="h-30"
                                    :options="accountGroupStore.accountGroup.accounts"
                                    :selected-id="ac.account_id"
                                    title="account_name"
                                    opid="id"
                                    :disabled="true"
                                    @select="ac.account_id = $event.id"
                                />
                            </div>
                            <input
                                v-model="ac.account_id"
                                type="text"
                                class="focus:ring-0 text-white absolute left-0 bottom-0 bg-transparent border-none h-[1px] p-0 w-fill"
                                required
                            >
                        </div>
                        <div class="flex flex-col relative flex-1">
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Stakeholder</label>
                                <AccountingSelectSearch
                                    class="bg-gray-50 border-gray-200"
                                    :class="'z-' + (30 - i)"
                                    height="h-30"
                                    :options="payeeList"
                                    :selected-id="ac.stakeholder_id"
                                    title="name"
                                    opid="id"
                                    :disabled="true"
                                    @select="ac.stakeholder_id = $event.id"
                                />
                            </div>
                            <input
                                v-model="ac.stakeholder_id"
                                type="text"
                                class="focus:ring-0 text-white absolute left-0 bottom-0 bg-transparent border-none h-[1px] p-0 w-fill"
                                required
                                disabled
                            >
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-900 dark:text-white">Debit</label>
                            <input v-model="ac.debit" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                        </div>
                        <div class="flex-1">
                            <label class="block text-xs font-medium text-gray-900 dark:text-white">Credit</label>
                            <input v-model="ac.credit" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled>
                        </div>
                    </div>
                </div>
                <i v-if="voucherStore.voucher.details.length === 0" class="text-center block mt-4 mb-2 text-gray-500">
                    There are no entries yet.
                </i>
            </div>
            <div class="flex justify-end w-full mb-8">
                <button
                    type="submit"
                    class="text-white p-2 px-6 bg-teal-600 content-center mt-5 rounded-md w-fit"
                >
                    Create Voucher
                </button>
            </div>
        </div>
    </form>
</template>
<style scoped>

</style>
