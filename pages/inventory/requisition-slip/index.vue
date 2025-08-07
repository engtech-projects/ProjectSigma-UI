<script lang="ts" setup>
import { useRequestStockStore } from "~/stores/inventory/requeststock"
const mainStore = useRequestStockStore()
const { requestStock } = storeToRefs(mainStore)
useHead({
    title: "Requisition Slip",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_REQUESTSTOCK_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_REQUESTSTOCK_FORM])"
                    target-id="Form"
                    title="Requisition Slip Form"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_REQUESTSTOCK_ALLREQUESTS])"
                    target-id="allRequest"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_REQUESTSTOCK_MYAPPROVALS])"
                    target-id="myApprovals"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_REQUESTSTOCK_FORM])"
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
