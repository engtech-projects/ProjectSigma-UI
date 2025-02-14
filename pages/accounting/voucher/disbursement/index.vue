<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"

const voucherStore = useVoucherStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_ALL,
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_REQUEST,
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_FOR_DISBURSEMENT_VOUCHER,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div class="w-full">
                <p class="text-xl">
                    Disbursement Voucher
                </p>
            </div>
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_ALL,
                        ])"
                        title="All List"
                        target-id="allList"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                        ])"
                        title="For Approval"
                        target-id="forApproval"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_REQUEST,
                        ])"
                        title="My Request List"
                        target-id="myRequestList"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_FOR_DISBURSEMENT_VOUCHER,
                        ])"
                        title="For Disbursement Voucher"
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
