<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"

const voucherStore = useVoucherStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT,
        ])"
    >
        <div class="flex flex-col gap-4">
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
                        title="For Voucher"
                        target-id="forVoucher"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="forVoucher">
                        <AccountingVoucherDisbursementForVoucherList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingVoucherDisbursementAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forApproval">
                        <AccountingVoucherDisbursementApprovalList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myRequestList">
                        <AccountingVoucherDisbursementMyRequestList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
            <div class="w-full">
                <AccountingVoucherDisbursementRequestForm
                    v-if="voucherStore.voucherDisbursement.reference_no"
                    :fillable="true"
                />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
