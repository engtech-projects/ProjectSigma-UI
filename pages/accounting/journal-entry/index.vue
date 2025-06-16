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
                        @click.once="journalStore.getVoidEntries()"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Posted Journals"
                        target-id="postedJournals"
                        @click.once="journalStore.getPostedEntries()"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Unposted Journals"
                        target-id="unpostedJournals"
                        @click.once="journalStore.getUnpostedEntries()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_FOR_PAYMENT_ENTRIES,
                        ])"
                        title="For Payment Journal Entry"
                        target-id="forPaymentJournalEntry"
                        @click.once="journalStore.getForPaymentJournalEntries()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_CASH_ENTRIES,
                        ])"
                        title="Cash"
                        target-id="treasuryJournalEntry"
                        @click.once="journalStore.getCashJournalEntries()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_JOURNAL_ENTRY_DISBURSEMENT_ENTRIES,
                        ])"
                        title="Disbursement"
                        target-id="disbursementJournalEntry"
                        @click.once="journalStore.getDisbursementJournalEntries()"
                    />
                    <AccountingCommonTabsTabTitle
                        title="PRF Journal Entries"
                        target-id="paymentRequestJournals"
                        @click.once="journalStore.getPaymentRequestEntries()"
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
