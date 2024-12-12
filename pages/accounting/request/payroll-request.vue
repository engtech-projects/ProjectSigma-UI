<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_REQUEST_PRE_PAYROLL_AUDIT,
        ])"
    >
        <div class="flex flex-col gap-4">
            <div>
                <p class="text-xl font-semibold">
                    Payment Request Form (Payroll)
                </p>
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
                        <AccountingRequestPayrollRequestAllList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myRequests">
                        <AccountingRequestPayrollRequestMyRequestList />
                    </AccountingCommonTabsTabContainer>
                    <AccountingCommonTabsTabContainer id="myApprovals">
                        <AccountingRequestPayrollRequestApprovalList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
