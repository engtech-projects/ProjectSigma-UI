<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div class="w-full">
                <AccountingRequestNonPurchaseRequestForm :fillable="true" />
            </div>
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="All List"
                        target-id="allList"
                    />
                    <AccountingCommonTabsTabTitle
                        title="My Requests"
                        target-id="myRequests"
                    />
                    <AccountingCommonTabsTabTitle
                        title="My Approvals"
                        target-id="myApprovals"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingRequestNonPurchaseRequestAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myRequests">
                        <AccountingRequestNonPurchaseRequestMyRequestList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myApprovals">
                        <AccountingRequestNonPurchaseRequestApprovalList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
