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
                </template>
                <template #tab-containers>
                    <AccountingCommonTabsTabContainer id="allList">
                        <AccountingRequestPayrollRequestAllList />
                    </AccountingCommonTabsTabContainer>
                </template>
            </AccountingCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
