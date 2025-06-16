<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const voucherStore = useVoucherStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_GROUP
        ])"
    >
        <div class="flex flex-col gap-4">
            <div class="w-full">
                <p class="text-xl">
                    Cash Voucher
                </p>
            </div>
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_ALL,
                        ])"
                        title="All List"
                        target-id="allList"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_MY_APPROVAL,
                        ])"
                        title="For Approval"
                        target-id="forApproval"
                        @click.once="voucherStore.getMyCashApprovals()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_MY_REQUEST,
                        ])"
                        title="My Request List"
                        target-id="myRequestList"
                        @click.once="voucherStore.getMyCashVouchers()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_CLEARED,
                        ])"
                        title="Cleared/Settled"
                        target-id="cleared"
                        @click.once="voucherStore.getClearedVouchers()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_FOR_CLEARING,
                        ])"
                        title="For Clearing/Settling"
                        target-id="forClearing"
                        @click.once="voucherStore.getClearingVouchers()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH_FOR_CASH_VOUCHER,
                        ])"
                        title="For Cash Voucher"
                        target-id="forVoucher"
                        @click.once="journalStore.getForCashVoucherEntries()"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingVoucherCashAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forApproval">
                        <AccountingVoucherCashApprovalList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myRequestList">
                        <AccountingVoucherCashMyRequestList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="cleared">
                        <AccountingVoucherCashClearedList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forClearing">
                        <AccountingVoucherCashClearingList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forVoucher">
                        <AccountingVoucherCashForVoucherList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
            <div class="w-full">
                <AccountingVoucherCashCreateForm
                    v-if="voucherStore.voucherCash.voucher_no"
                    :fillable="true"
                />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
