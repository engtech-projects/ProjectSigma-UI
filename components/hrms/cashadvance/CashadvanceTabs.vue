<script setup>
</script>

<template>
    <HrmsCommonTabsMainContainer>
        <template #tab-titles>
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_cash_advance_allrequests,
                ])"
                title="All Requests"
                target-id="allListCA"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_cash_advance_formsmyrequest,
                ])"
                title="My Requests"
                target-id="myRequestsCA"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_cash_advance_myapprovals,
                ])"
                title="My Approvals"
                target-id="myApprovalsCA"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_cash_advance_myapprovals,
                ])"
                title="Ongoing Cash Advance"
                target-id="ongoingCA"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_cash_advance_myapprovals,
                ])"
                title="Paid Cash Advance"
                target-id="paidsCA"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_loans_and_advances_cash_advance_myapprovals,
                ])"
                title="Payments Cash Advance"
                target-id="paymentCA"
            />
        </template>
        <template #tab-containers>
            <HrmsCommonTabsTabContainer id="allListCA">
                <HrmsCashadvanceList />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer id="myRequestsCA">
                <HrmsCashadvanceMyRequests />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer id="myApprovalsCA">
                <HrmsCashadvanceMyApprovals />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer id="ongoingCA">
                <HrmsCashadvanceOngoingCashAdvance />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer id="paidsCA">
                <HrmsCashadvancePaidCashAdvance />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer id="paymentCA">
                <HrmsCashadvancePaymentCashAdvance />
            </HrmsCommonTabsTabContainer>
        </template>
    </HrmsCommonTabsMainContainer>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
