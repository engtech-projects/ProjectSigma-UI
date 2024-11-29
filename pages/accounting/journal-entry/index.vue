<script setup>
import { useJournalStore } from "@/stores/accounting/journals/journal"
const journalStore = useJournalStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div>
                <p class="text-gray-900 text-xl font-semibold">
                    Journal Entry
                </p>
            </div>
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="PRF Journal Entries"
                        target-id="paymentRequestJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Posted Journals"
                        target-id="postedJournals"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="postedJournals">
                        <AccountingJournalPostedList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="paymentRequestJournals">
                        <AccountingJournalPaymentRequestList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
        <div class="w-full">
            <AccountingJournalEntryForm
                v-show="journalStore.journal.journal_no"
                :fillable="true"
            />
        </div>
    </LayoutAcessContainer>
</template>
