<script setup>
const compId = useId()
</script>
<template>
    <HrmsCommonTabsMainContainer>
        <template #tab-titles>
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_lnotnto_leave_list,
                ])"
                :target-id="'all-list' + compId"
                title="All List"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_lnotnto_leave_form,
                ])"
                :target-id="'my-requests' + compId"
                title="My Requests"
            />
            <HrmsCommonTabsTabTitle
                v-if="useCheckAccessibility([
                    AccessibilityTypes.hrms_lnotnto_leave_my_approvals,
                ])"
                :target-id="'my-approvals' + compId"
                title="My Approvals"
            />
        </template>
        <template #tab-containers>
            <HrmsCommonTabsTabContainer :id="'all-list' + compId">
                <HrmsOvertimeList />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer :id="'my-requests' + compId">
                <HrmsOvertimeMyRequests />
            </HrmsCommonTabsTabContainer>
            <HrmsCommonTabsTabContainer :id="'my-approvals' + compId">
                <HrmsOvertimeMyApprovals />
            </HrmsCommonTabsTabContainer>
        </template>
    </HrmsCommonTabsMainContainer>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
