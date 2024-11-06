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
        class="max-w-4xl"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_bom_forms_and_my_requests,
                    ])"
                    title="Form"
                    target-id="Form"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_bom_all_request,
                    ])"
                    title="All List"
                    target-id="allList"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_bom_my_approvals,
                    ])"
                    title="My Approvals"
                    target-id="myApprovals"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_bom_forms_and_my_requests,
                    ])"
                    title="My Request"
                    target-id="myRequests"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_bom_current_bom,
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
                    <InventoryBomRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryBomRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryBomRequestMyRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myCurrentBom">
                    <InventoryBomRequestCurrentBom />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
