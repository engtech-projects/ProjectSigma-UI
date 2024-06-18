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
await transactionStore.showTransaction(useRoute().query.id)
const stakeholderStore = useStakeholderStore()
await stakeholderStore.getStakeholders()
const stakeholderGroupStore = useStakeholderGroupStore()
await stakeholderGroupStore.getStakeholderGroups()
transactionStore.transaction.transaction_type_id = transactionStore.transaction.transaction_type.transaction_type_id
definePageMeta({
    layout: "default",
})
useHead({
    title: "Edit Transaction",
})
</script>

<template>
    <div class="flex justify-center min-h-full">
        <AccountingTransactionEdit class="flex-1 max-w-[1000px]" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
