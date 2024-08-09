<script lang="ts" setup>
import { usePostingPeriodStore } from "~/stores/accounting/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
await postingPeriodStore.getPostingPeriods()
definePageMeta({
    layout: "default",
})
useHead({
    title: "Document Series",
})
</script>

<template>
    <div class="flex flex gap-4">
        <!-- <div class="flex-1">
            <AccountingTransactionEditTransactionType v-if="transactionTypeStore.isEdit" class="flex-1" />
            <AccountingTransactionNewTransactionType v-else class="flex-1" />
        </div> -->
        <AccountingJournalentryList class="flex-2" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
