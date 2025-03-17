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
            <div class="w-full">
                <p class="text-xl">
                    Journal Entry
                </p>
            </div>
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="Open Journals"
                        target-id="openJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Void Journals"
                        target-id="voidJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Posted Journals"
                        target-id="postedJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Unposted Journals"
                        target-id="unpostedJournals"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_FOR_PAYMENT_ENTRIES,
                        ])"
                        title="For Payment Journal Entry"
                        target-id="forPaymentJournalEntry"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_CASH_ENTRIES,
                        ])"
                        title="Cash"
                        target-id="treasuryJournalEntry"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_DISBURSEMENT_ENTRIES,
                        ])"
                        title="Disbursement"
                        target-id="disbursementJournalEntry"
                    />
                    <AccountingCommonTabsTabTitle
                        title="PRF Journal Entries"
                        target-id="paymentRequestJournals"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="openJournals">
                        <AccountingJournalOpenList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="voidJournals">
                        <AccountingJournalVoidList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="postedJournals">
                        <AccountingJournalPostedList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="unpostedJournals">
                        <AccountingJournalUnPosted />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forPaymentJournalEntry">
                        <AccountingJournalForPaymentEntry />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="treasuryJournalEntry">
                        <AccountingJournalCashJournalEntry />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="disbursementJournalEntry">
                        <AccountingJournalDisbursementJournalEntry />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="paymentRequestJournals">
                        <AccountingJournalPaymentRequestList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
        <div class="w-full">
            <AccountingJournalEntryForm
                v-if="journalStore.journal.journal_no"
                :fillable="true"
            />
        </div>
    </LayoutAcessContainer>
</template>
