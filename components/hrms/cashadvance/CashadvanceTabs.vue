<template>
    <LayoutBoards title="Cash Advance" class="w-full" :loading="boardLoading">
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle title="All List" target-id="allListCA" />
                <HrmsCommonTabsTabTitle v-show="false" title="My Releases" target-id="myReleasesCA" />
                <HrmsCommonTabsTabTitle title="My Approvals" target-id="myApprovalsCA" />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="allListCA">
                    <HrmsCashadvanceList />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer v-show="false" id="myReleasesCA">
                    <HrmsCashadvanceMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovalsCA">
                    <HrmsCashadvanceMyApprovals />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutBoards>
</template>

<style scoped>
.customize-table {
    --easy-table-header-item-padding: 10px 15px;
}
</style>
