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
                        title="For Cash Voucher"
                        target-id="forVoucher"
                    />
                    <AccountingCommonTabsTabTitle
                        title="Cleared/Settled Cash Vouchers"
                        target-id="forClearing"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingVoucherCashAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forVoucher">
                        <AccountingVoucherCashForVoucherList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forApproval">
                        <AccountingVoucherCashApprovalList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myRequestList">
                        <AccountingVoucherCashMyRequestList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forClearing">
                        <AccountingVoucherCashClearingList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
            <div class="w-full">
                <AccountingVoucherCashCreateForm
                    v-if="voucherStore.voucherCash.voucher_no"
                    :fillable="true"
                />
                <div v-else class="w-full py-2">
                    <p class="text-center text-gray-300">
                        No Cash Vouchers transactions yet.
                    </p>
                </div>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
