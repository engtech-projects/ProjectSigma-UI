<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_VOUCHER_CASH,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div>
                <p class="text-gray-900 text-xl font-semibold">
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
                        title="For Release"
                        target-id="forRelease"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingVoucherCashAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forApproval">
                        <AccountingVoucherCashForApprovalList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="forRelease">
                        <AccountingVoucherCashForReleaseList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
