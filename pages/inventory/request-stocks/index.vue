<script lang="ts" setup>
import { useRequestStockStore } from "~/stores/inventory/requeststock"
const mainStore = useRequestStockStore()
const { requestStock } = storeToRefs(mainStore)
useHead({
    title: "Request Stocks",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.inventory_request_stock_group,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.inventory_request_stock_forms_and_my_requests])"
                    target-id="Form"
                    title="Request Stocks FORM"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.inventory_request_stock_all_request])"
                    target-id="allRequest"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.inventory_request_stock_my_approvals])"
                    target-id="myApprovals"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.admin])"
                    target-id="myRequests"
                    title="My Request"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryRequestStockForm v-model="requestStock.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryRequestStockRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryRequestStockRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryRequestStockRequestMyRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
