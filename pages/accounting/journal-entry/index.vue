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
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.accounting_journal_group,
        ])"
    >
        <div class="flex flex gap-4">
            <!-- <div class="flex-1">
                <AccountingTransactionEditTransactionType v-if="transactionTypeStore.isEdit" class="flex-1" />
                <AccountingTransactionNewTransactionType v-else class="flex-1" />
            </div> -->
            <AccountingJournalentryList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
