<script lang="ts" setup>
// import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
// const mainStore = usePriceQuotationStore()
// const { priceQuotation } = storeToRefs(mainStore)
useHead({
    title: "Price Quotation",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_REQUEST_PRICE_QUOTATION_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_REQUESTPRICEQUOTATION_REQUESTS])"
                    target-id="Request"
                    title="Request For Price Quotation"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_REQUESTPRICEQUOTATION_ALLREQUEST])"
                    target-id="allRequest"
                    title="All Price Quotations"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_PROCUREMENT_REQUESPRICEQUOTATION_MYREQUESTS,
                    ])"
                    target-id="myRequests"
                    title="My Price Quotations"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Request">
                    <InventoryPriceQuotationRequestList />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryPriceQuotationRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryPriceQuotationRequestMyRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
