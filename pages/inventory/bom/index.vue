<script lang="ts" setup>
useHead({
    title: "Project/Department BOM",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            'Admin only',
        ])"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        'Admin only',
                    ])"
                    title="Form"
                    target-id="Form"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        'Admin only',
                    ])"
                    title="All List"
                    target-id="allList"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        'Admin only',
                    ])"
                    title="My Approvals"
                    target-id="myApprovals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        'Admin only',
                    ])"
                    title="My Request"
                    target-id="myRequests"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        'Admin only',
                    ])"
                    title="Current Bom"
                    target-id="myCurrentBom"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryBomForm />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allList">
                    <InventoryBomForm />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryBomForm />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryBomForm />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myCurrentBom">
                    <InventoryBomForm />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
