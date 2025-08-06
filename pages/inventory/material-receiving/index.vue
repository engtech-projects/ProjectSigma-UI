<script lang="ts" setup>
useHead({
    title: "Receivings",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_MATERIALS_RECEIVING_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_MATERIALS_RECEIVING_REQUESTPROCESSING])"
                    target-id="Form"
                    title="Materials Receiving Report"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_MATERIALS_RECEIVING_ALLREQUEST])"
                    target-id="allRequest"
                    title="All Request"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryReceivingForm />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryReceivingRequestAllRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
