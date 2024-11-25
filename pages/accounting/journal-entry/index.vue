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
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="Posted Journals"
                        target-id="postedJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Unposted Journals"
                        target-id="unpostedJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Draft Journals"
                        target-id="draftJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        title="PRF Journal Entries"
                        target-id="paymentRequestJournals"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="postedJournals">
                        <AccountingJournalPostedList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="unpostedJournals">
                        <AccountingJournalUnpostedList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="draftJournals">
                        <AccountingJournalDraftedList />
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
