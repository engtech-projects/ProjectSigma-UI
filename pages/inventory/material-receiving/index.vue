<script lang="ts" setup>
import { useReceivingStore } from "~/stores/inventory/receiving"
const mainStore = useReceivingStore()
const { receiving } = storeToRefs(mainStore)
useHead({
    title: "Receivings",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_FORMSANDMYREQUESTS])"
                    target-id="Form"
                    title="Materials Receiving Report"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_ALLREQUEST])"
                    target-id="allRequest"
                    title="All Request"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryReceivingForm v-model="receiving.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryReceivingRequestAllRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
