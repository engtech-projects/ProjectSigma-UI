<script setup>
import { useVoucherStore } from "@/stores/accounting/vouchers/voucher"
import { useJournalStore } from "@/stores/accounting/journals/journal"

const journalStore = useJournalStore()
const voucherStore = useVoucherStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_GROUP,
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
                        @click.once="voucherStore.getMyDisbursementApprovals()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_REQUEST,
                        ])"
                        title="My Request List"
                        target-id="myRequestList"
                        @click.once="voucherStore.getMyDisbursementVouchers()"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_FOR_DISBURSEMENT_VOUCHER,
                        ])"
                        title="For Disbursement Voucher"
                        target-id="forVoucher"
                        @click.once="journalStore.getForDisbursementVoucherEntries()"
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
