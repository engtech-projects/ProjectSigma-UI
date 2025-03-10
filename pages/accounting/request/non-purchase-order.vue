<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER_GROUP,
        ])"
    >
        <div class="flex flex-col gap-4">
            <AccountingCommonTabsMainContainer class="w-full">
                <template #tab-titles>
                    <AccountingCommonTabsTabTitle
                        title="NPO Form"
                        target-id="npoForm"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER_ALL,
                        ])"
                        title="All List"
                        target-id="allList"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER_MY_REQUEST,
                        ])"
                        title="My Requests"
                        target-id="myRequests"
                    />
                    <AccountingCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.ACCOUNTING_REQUEST_NON_PURCHASE_ORDER_MY_APPROVAL,
                        ])"
                        title="My Approvals"
                        target-id="myApprovals"
                    />
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="npoForm">
                        <AccountingRequestNonPurchaseRequestForm :fillable="true" />
                    </AccountingCommonTabsTabContainer>
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
