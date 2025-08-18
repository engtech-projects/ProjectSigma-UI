<script lang="ts" setup>
useHead({
    title: "Canvass Summary",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_ALLREQUEST])"
                    target-id="allRequest"
                    title="All Requests"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_PROCUREMENT_CANVASSSUMMARY_MYREQUESTS,
                    ])"
                    target-id="myApprovals"
                    title="My Approvals"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryCanvassSummaryRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryCanvassSummaryRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
