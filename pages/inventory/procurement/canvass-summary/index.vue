<script lang="ts" setup>
// import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
// const mainStore = usePriceQuotationStore()
// const { priceQuotation } = storeToRefs(mainStore)
useHead({
    title: "Canvass Summary",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.ADMIN_ONLY,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.ADMIN_ONLY])"
                    target-id="Request"
                    title="Canvass Summary"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.ADMIN_ONLY])"
                    target-id="allRequest"
                    title="All Canvass Summary"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ADMIN_ONLY,
                    ])"
                    target-id="myRequests"
                    title="My Canvass Summary"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Request">
                    <InventoryCanvassSummaryRequestList />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryCanvassSummaryRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryCanvassSummaryRequestMyRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
