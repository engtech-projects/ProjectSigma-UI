<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
import { useVoucherStore } from "~/stores/accounting/voucher"

const { list: payeeList } = storeToRefs(useStakeholderStore())
const accountGroupStore = useAccountGroupStore()
const voucherStore = useVoucherStore()

const emit = defineEmits(["view-details"])
const loading = ref(false)
const snackbar = useSnackbar()
const accountEntry = ref({
    account_id: null,
    stakeholder_id: null,
    debit: 0,
    credit: 0
})
async function handleSubmit () {
    try {
        loading.value = true
        await voucherStore.editVoucher()
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
        }
    } catch (error) {
    } finally {
        loading.value = false
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
const navigate = (url = "", action = "", voucher = null) => {
    history.pushState(null, "", url)
    if (voucher) {
        voucherStore.voucher = voucher
    }
    emit(action)
}
const totalDebit = computed(() => {
    let total = 0
    voucherStore.voucher.details.forEach((d:any) => {
        total += parseFloat(d.debit)
    })
    return total
})
const totalCredit = computed(() => {
    let total = 0
    voucherStore.voucher.details.forEach((d:any) => {
        total += parseFloat(d.credit)
    })
    return total
})
onMounted(() => {
    voucherStore.voucher.voucher_date = dateToString(new Date(voucherStore.voucher.voucher_date))
    voucherStore.voucher.date_encoded = dateToString(new Date(voucherStore.voucher.date_encoded))
})
</script>
<template>
    <form @submit.prevent="handleSubmit">
        <div class="bg-white shadow rounded-lg border border-gray-200 px-2 border-t-4 border-green-500">
            <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
                <img
                    class="flex justify-center w-28 rounded-md"
                    src="/loader.gif"
                    alt="logo"
                >
            </div>
            <div class="flex justify-between items-center h-16 border-b px-4">
                <h2 class="text-xl text-gray-800">
                    Edit Disbursement Voucher
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
                            class="z-50 bg-gray-50 border-gray-200"
                            :options="accountGroupStore.accountGroup.accounts"
                            :selected-id="voucherStore.voucher.account_id"
                            title="account_name"
                            opid="id"
                            @select="voucherStore.voucher.account_id = $event.id"
                        />
                    </div>
                    <div class="flex-1 gap-2">
                        <label for="formType" class="block text-sm font-medium text-gray-900 dark:text-white">Form Type</label>
                        <select id="formType" v-model="voucherStore.voucher.form_type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option :value="null" selected />
                            <option value="PaymentRequest">
                                Payment Request
                            </option>
                            <option value="PayrollRequest">
                                Payroll Request
                            </option>
                        </select>
                    </div>
                </div>
                <div v-if="voucherStore.voucher.form_type" class="flex gap-2 w-full">
                    <div class="flex-1">
                        <label for="referenceNo" class="block text-sm font-medium text-gray-900 dark:text-white">Reference No.</label>
                        <input id="referenceNo" v-model="voucherStore.voucher.reference_no" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
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
                        <div v-if="voucherStore.voucher.details.length > 1" class="flex gap-1 bg-green-200 py-1 px-4">
                            <div class="flex-1">
                                <h3 class="font-bold">
                                    TOTAL
                                </h3>
                            </div>
                            <div class="flex-1" />
                            <div class="flex-1">
                                <h3 class="font-bold">
                                    {{ formatToCurrency(totalDebit) }}
                                </h3>
                            </div>
                            <div class="flex-1">
                                <h3 class="font-bold">
                                    {{ formatToCurrency(totalCredit) }}
                                </h3>
                            </div>
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
                                bg-green-400
                                cursor-pointer
                                hover:bg-green-500
                                active:bg-green-600"
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
                            bg-green-400
                            cursor-pointer
                            hover:bg-green-500
                            active:bg-green-600"
                        @click.prevent="addEntry"
                    >
                        + Add Entry
                    </button>
                </div>
            </form>
            <div class="flex justify-between w-full mb-8 gap-2 items-center mt-5">
                <button
                    class="text-gray-700 self-start hover:text-blue-500 border-gray-700 mt-2"
                    @click.prevent="navigate('/accounting/voucher/disbursement?details=' + voucherStore.voucher.id, 'view-details')"
                >
                    <Icon name="ion:ios-arrow-thin-left" class="mr-1 text-2xl" />
                    Back to details
                </button>
                <div class="flex gap-2">
                    <button
                        type="submit"
                        class="text-white p-2 px-6 bg-teal-600 content-center rounded-md w-fit"
                    >
                        Update Voucher
                    </button>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>
@import "/css/accounting.css";
</style>
