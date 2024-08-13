<script setup>
const compId = useId()
</script>
<template>
    <div class="w-full">
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    :target-id="'all-list' + compId"
                    title="All List"
                />
                <HrmsCommonTabsTabTitle
                    :target-id="'my-requests' + compId"
                    title="My Requests"
                />
                <HrmsCommonTabsTabTitle
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
