<script setup>
const compId = useId()
</script>
<template>
    <div class="w-full">
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_new_item_profile_all_request,
                    ])"
                    :target-id="'all-list' + compId"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_new_item_profile_forms_and_my_requests,
                    ])"
                    :target-id="'my-requests' + compId"
                    title="My Requests"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_new_item_profile_my_approvals,
                    ])"
                    :target-id="'my-approvals' + compId"
                    title="My Approvals"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer :id="'all-list' + compId">
                    <InventoryItemProfileRequestList />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="'my-requests' + compId">
                    <InventoryItemProfileMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer :id="'my-approvals' + compId">
                    <InventoryItemProfileMyApprovals />
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
