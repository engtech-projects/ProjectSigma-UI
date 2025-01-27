<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"

const voucherStore = useVoucherStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH,
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
                        title="All List"
                        target-id="allList"
                    />
                    <AccountingCommonTabsTabTitle
                        title="For Approval"
                        target-id="forApproval"
                    />
                    <AccountingCommonTabsTabTitle
                        title="My Request List"
                        target-id="myRequestList"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Cleared/Settled"
                        target-id="cleared"
                    />
                    <AccountingCommonTabsTabTitle
                        title="For Clearing/Settling"
                        target-id="forClearing"
                    />
                    <AccountingCommonTabsTabTitle
                        title="For Cash Voucher"
                        target-id="forVoucher"
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
