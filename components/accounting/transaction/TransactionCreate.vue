<script lang="ts" setup>
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"
import { useTransactionStore } from "~/stores/accounting/transaction"
import { usePostingPeriodStore } from "~/stores/accounting/postingperiod"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useStakeholderGroupStore } from "~/stores/accounting/stakeholdergroup"

const postingPeriodStore = usePostingPeriodStore()
await postingPeriodStore.getPostingPeriods()
const transactionTypeStore = useTransactionTypeStore()
await transactionTypeStore.getTransactionTypes()
const transactionStore = useTransactionStore()
const stakeholderStore = useStakeholderStore()
await stakeholderStore.getStakeholders()
const stakeholderGroupStore = useStakeholderGroupStore()
await stakeholderGroupStore.getStakeholderGroups()
const boardLoading = ref(false)
const snackbar = useSnackbar()
// const sgName = computed(() => {
//     let st = null
//     if (detail.value.stakeholder_group_id) {
//         st = stakeholderGroupStore.list.filter(s => s.stakeholder_group_id === detail.value.stakeholder_group_id)[0].stakeholder_group_name
//     }
//     return st
// })
const detail = ref({
    transaction_detail_id: null,
    stakeholder_group_id: null,
    stakeholder_group_name: null,
    stakeholder_id: null,
    debit: 0,
    credit: 0
})
const details = ref([])
const addDetail = () => {
    detail.value.stakeholder_group_name = stakeholderGroupStore.list.filter(s => s.stakeholder_group_id === detail.value.stakeholder_group_id)[0].stakeholder_group_name
    details.value.push(JSON.parse(JSON.stringify(detail.value)))
    detail.value = {
        transaction_detail_id: null,
        stakeholder_group_id: null,
        stakeholder_group_name: null,
        debit: 0,
        credit: 0
    }
}

async function handleSubmit () {
    try {
        boardLoading.value = true
        transactionStore.transaction.details = JSON.stringify([{
            stakeholder_id: 1,
            account_id: 1,
            debit: transactionStore.transaction.amount,
            credit: 0
        }])
        transactionStore.transaction.description = "No description."
        await transactionStore.createTransaction()
        if (transactionStore.errorMessage !== "") {
            snackbar.add({
                type: "error",
                text: transactionStore.errorMessage
            })
        } else {
            snackbar.add({
                type: "success",
                text: transactionStore.successMessage
            })
        }
    } catch (error) {
        transactionStore.errorMessage = errorMessage
        snackbar.add({
            type: "error",
            text: transactionStore.errorMessage
        })
    } finally {
        // transactionStore.reset()
        boardLoading.value = false
        navigateTo("/accounting/transaction")
    }
}

// function cancelEdit () {
//     transactionTypeStore.isEdit = false
//     transactionTypeStore.reset()
// }
function select (val:any) {
    transactionStore.transaction.transaction_type_id = val.transaction_type_id
}
function selectStakeholder (val:any) {
    transactionStore.transaction.stakeholder_id = val.stakeholder_id
}
</script>

<template>
    <LayoutBoards title="Create New Transaction" :loading="boardLoading" class="w-full h-fit">
        <form @submit.prevent="!transactionTypeStore.isEdit?handleSubmit():updateType()">
            <div class="flex flex-col gap-2">
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="transaction_number"
                            class="text-xs italic"
                        >Transaction No.</label>
                        <input
                            id="transactionNumber"
                            v-model="transactionStore.transaction.transaction_no"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="transaction_date"
                            class="text-xs italic"
                        >Transaction Date</label>
                        <input
                            id="transactionDate"
                            v-model="transactionStore.transaction.transaction_date"
                            type="date"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="transaction_type"
                            class="text-xs italic"
                        >Transaction Type</label>
                        <AccountingSelectSearch
                            :options="transactionTypeStore.list"
                            title="transaction_type_name"
                            opid="transaction_type_id"
                            :selected-id="transactionStore.transaction.transaction_type_id"
                            @select="select"
                        />
                    </div>
                    <div class="flex-1">
                        <label
                            for="reference_number"
                            class="text-xs italic"
                        >Reference No.</label>
                        <input
                            id="referenceNumber"
                            v-model="transactionStore.transaction.reference_no"
                            type="text"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="flex-1">
                        <label
                            for="amount"
                            class="text-xs italic"
                        >Amount</label>
                        <input
                            id="amount"
                            v-model="transactionStore.transaction.amount"
                            type="number"
                            class="w-full rounded-lg"
                            required
                        >
                    </div>
                    <div class="flex-1">
                        <label
                            for="period"
                            class="text-xs italic"
                        >Period</label>
                        <select
                            id="period"
                            v-model="transactionStore.transaction.period_id"
                            class="w-full rounded-lg"
                            required
                        >
                            <option v-for="p in postingPeriodStore.list" :key="p.period_id" :value="p.period_id">
                                {{ p.period_start }}
                            </option>
                        </select>
                    </div>
                </div>
                <div>
                    <label
                        for="transaction_type"
                        class="text-xs italic"
                    >Stakeholder</label>
                    <AccountingSelectSearch
                        :options="stakeholderStore.list"
                        title="display_name"
                        opid="stakeholder_id"
                        :selected-id="transactionStore.transaction.stakeholder_id"
                        @select="selectStakeholder"
                    />
                </div>
                <span class="font-bold text-gray-700">
                    Transaction Details
                </span>
                <form action="" @submit.prevent="addDetail">
                    <div class="flex gap-2">
                        <div class="flex flex-col gap-1 flex-2">
                            <label for="" class="text-xs italic">
                                Stakeholder Group
                            </label>
                            <select
                                id="period"
                                v-model="detail.stakeholder_group_id"
                                class="w-full rounded-lg"
                                required
                            >
                                <option v-for="p in stakeholderGroupStore.list" :key="p.stakeholder_group_id" :value="p.stakeholder_group_id">
                                    {{ p.stakeholder_group_name }}
                                </option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Debit
                            </label>
                            <input
                                id="amount"
                                v-model="detail.debit"
                                type="number"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Credit
                            </label>
                            <input
                                id="amount"
                                v-model="detail.credit"
                                type="number"
                                class="w-full rounded-lg"
                                required
                            >
                        </div>
                        <button
                            type="submit"
                            class="text-white p-2 px-4 rounded bg-teal-600 content-center mt-5 rounded-md w-fit"
                        >
                            <Icon name="fa:plus-circle" class="mr-1" />
                            Add
                        </button>
                    </div>
                </form>
                <div class="flex flex-col gap-2">
                    <div v-for="d,i in details" :key="i" class="flex gap-2">
                        <div class="flex flex-col gap-1 flex-2">
                            <label for="" class="text-xs italic">
                                Stakeholder Group
                            </label>
                            <input
                                id="amount"
                                type="text"
                                class="w-full rounded-lg border-0 bg-gray-100"
                                :value="d.stakeholder_group_name"
                                required
                                disabled
                            >
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Debit
                            </label>
                            <input
                                id="amount"
                                type="number"
                                class="w-full rounded-lg border-0 bg-gray-100"
                                :value="d.debit"
                                required
                                disabled
                            >
                        </div>
                        <div class="flex flex-col gap-1 flex-1">
                            <label for="" class="text-xs italic">
                                Credit
                            </label>
                            <input
                                id="amount"
                                type="number"
                                class="w-full rounded-lg border-0 bg-gray-100"
                                :value="d.credit"
                                required
                                disabled
                            >
                        </div>
                    </div>
                </div>
                <!-- <div>
                    <label
                        for="details"
                        class="text-xs italic"
                    >Details</label>
                    <textarea
                        id="details"
                        v-model="transactionStore.transaction.details"
                        class="w-full rounded-lg"
                        required
                    />
                </div> -->
            </div>

            <div class="flex justify-end gap-4">
                <NuxtLink
                    to="/accounting/transaction"
                    class="flex-1 text-white p-2 rounded bg-slate-600 content-center mt-5 text-center"
                >
                    Cancel
                </NuxtLink>
                <button
                    type="submit"
                    class="flex-1 text-white p-2 rounded bg-teal-600 content-center mt-5"
                >
                    Add Transaction
                </button>
            </div>
        </form>
    </LayoutBoards>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
