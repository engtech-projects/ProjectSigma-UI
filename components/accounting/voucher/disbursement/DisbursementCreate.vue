<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useVoucherStore } from "~/stores/accounting/voucher"
import { useBookStore } from "~/stores/accounting/book"

const { list: payeeList } = storeToRefs(useStakeholderStore())
const accountGroupStore = useAccountGroupStore()
const voucherStore = useVoucherStore()
voucherStore.generateVoucherNumber("DV")
const bookStore = useBookStore()

const snackbar = useSnackbar()
const accountEntry = ref({
    account_id: null,
    stakeholder_id: null,
    debit: 0,
    credit: 0
})
async function handleSubmit () {
    try {
        voucherStore.voucher.book_id = bookStore.cash.id
        await voucherStore.createVoucher()
        if (voucherStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: voucherStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: voucherStore.successMessage
            })
            voucherStore.reset()
        }
    } catch (error) {
    }
}
const amount = computed(() => {
    return voucherStore.voucher.net_amount
})
watch(amount, (newAmount) => {
    voucherStore.voucher.amount_in_words = useAmountInWords(newAmount)
})
const addEntry = () => {
    voucherStore.voucher.details.push(JSON.parse(JSON.stringify(accountEntry.value)))
}
const removeEntry = (entry) => {
    voucherStore.voucher.details = voucherStore.voucher.details.filter(e => e !== entry)
}
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
                    Disbursement Voucher
                </h2>
            </div>
            <div class="flex flex-col gap-3 p-4 w-full">
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="referenceNo" class="block text-sm font-medium text-gray-900 dark:text-white">Reference No.</label>
                        <input id="referenceNo" v-model="voucherStore.voucher.voucher_no" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="payee" class="block text-sm font-medium text-gray-900 dark:text-white">Payee</label>
                        <AccountingSelectSearch
                            class="z-50 bg-gray-50 border-gray-200"
                            :options="payeeList"
                            title="name"
                            opid="id"
                            :selected-id="voucherStore.voucher.stakeholder_id"
                            @select="voucherStore.voucher.stakeholder_id = $event.id"
                        />
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="dateEncoded" class="block text-sm font-medium text-gray-900 dark:text-white">Encoded Date</label>
                        <input id="dateEncoded" v-model="voucherStore.voucher.date_encoded" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="dateCreate" class="block text-sm font-medium text-gray-900 dark:text-white">Created Date</label>
                        <input id="dateCreate" v-model="voucherStore.voucher.voucher_date" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="netAmount" class="block text-sm font-medium text-gray-900 dark:text-white">Net Amount</label>
                        <input id="netAmount" v-model="voucherStore.voucher.net_amount" type="number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="amountWords" class="block text-sm font-medium text-gray-900 dark:text-white">Amount in words</label>
                        <input id="amountWords" v-model="voucherStore.voucher.amount_in_words" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                    </div>
                </div>
                <div class="flex gap-2 w-full justify-between">
                    <div class="flex-1">
                        <label for="expenseAccount" class="block text-sm font-medium text-gray-900 dark:text-white">Account</label>
                        <AccountingSelectSearch
                            id="expenseAccount"
                            class="bg-gray-50 border-gray-200"
                            :options="accountGroupStore.accountGroup.accounts"
                            :selected-id="voucherStore.voucher.account_id"
                            title="account_name"
                            opid="id"
                            @select="voucherStore.voucher.account_id = $event.id"
                        />
                    </div>
                    <div class="flex-1 gap-2" />
                </div>
            </div>
            <form action="">
                <div class="bg-gray-100 p-4 py-8 flex flex-col items-center mb-8">
                    <h2 class="text-center font-bold text-gray-800">
                        ACCOUNTING ENTRIES
                    </h2>
                    <div class="flex flex-col w-full gap-2 mt-4">
                        <div v-for="ac,i in voucherStore.voucher.details" :key="i" class="flex gap-1 w-full items-end">
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
                                    @select="ac.account_id = $event.id"
                                />
                            </div>
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
                                    @select="ac.stakeholder_id = $event.id"
                                />
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Debit</label>
                                <input v-model="ac.debit" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <div class="flex-1">
                                <label class="block text-xs font-medium text-gray-900 dark:text-white">Credit</label>
                                <input v-model="ac.credit" type="number" class="h-[35px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                            </div>
                            <Icon name="ion:close-round" class="text-red-400 text-2xl mb-1 cursor-pointer hover:text-red-500 active:text-red-600" @click="removeEntry(ac)" />
                        </div>
                    </div>
                    <i v-if="voucherStore.voucher.details.length === 0" class="text-center block mt-4 mb-2 text-gray-500">
                        There are no entries yet.
                    </i>
                    <div v-if="voucherStore.voucher.details.length > 0" class="flex justify-left w-full mt-1">
                        <button
                            class="
                                border
                                px-4
                                rounded-xl
                                text-xs
                                py-[2px]
                                bg-slate-400
                                cursor-pointer
                                hover:bg-slate-500
                                active:bg-slate-600"
                            @click.prevent="addEntry"
                        >
                            + Add Entry
                        </button>
                    </div>
                    <button
                        v-else
                        class="
                            border
                            rounded-xl
                            px-4
                            text-xs
                            py-[2px]
                            bg-slate-400
                            cursor-pointer
                            hover:bg-slate-500
                            active:bg-slate-600"
                        @click.prevent="addEntry"
                    >
                        + Add Entry
                    </button>
                </div>
            </form>
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
.z-30 {
    z-index: 30;
}
.z-29 {
    z-index: 29;
}
.z-28 {
    z-index: 28;
}
.z-27 {
    z-index: 27;
}
.z-26 {
    z-index: 26;
}
.z-30 {
    z-index: 30;
}
.z-25 {
    z-index: 25;
}
.z-24 {
    z-index: 24;
}
.z-23 {
    z-index: 23;
}
.z-22 {
    z-index: 22;
}
.z-21 {
    z-index: 21;
}
.z-20 {
    z-index: 20;
}
.z-19 {
    z-index: 19;
}
.z-18 {
    z-index: 18;
}
.z-17 {
    z-index: 17;
}
.z-16 {
    z-index: 16;
}
.z-15 {
    z-index: 15;
}
.z-14 {
    z-index: 14;
}
.z-13 {
    z-index: 13;
}
</style>
