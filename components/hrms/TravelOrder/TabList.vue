<script setup>
const compId = useId()
</script>
<template>
    <div class="w-full">
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_travel_order_form,
                    ])"
                    :target-id="'to-tab1' + compId"
                    title="Request Form"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_travel_order_list,
                    ])"
                    :target-id="'all-list' + compId"
                    title="All List"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_travel_order_my_request,
                    ])"
                    :target-id="'my-requests' + compId"
                    title="My Requests"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_travel_order_my_approvals,
                    ])"
                    :target-id="'my-approvals' + compId"
                    title="My Approvals"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer :id="'to-tab1' + compId">
                    <HrmsTravelOrderRequestForm />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="'all-list' + compId">
                    <HrmsTravelOrderList />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="'my-requests' + compId">
                    <HrmsTravelOrderMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="'my-approvals' + compId">
                    <HrmsTravelOrderMyApprovals />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </div>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
