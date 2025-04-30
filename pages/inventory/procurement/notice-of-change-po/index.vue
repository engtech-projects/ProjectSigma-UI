<script lang="ts" setup>
import { useNcpoStore } from "~/stores/inventory/procurement/ncpo"
const mainStore = useNcpoStore()
const { ncpoRequest } = storeToRefs(mainStore)
useHead({
    title: "NCPO",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_FORMSANDMYREQUESTS])"
                    target-id="Form"
                    title="NOTICE OF CHANGES IN PURCHASE ORDER (NCPO)"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_ALLREQUEST])"
                    target-id="allRequest"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_MYAPPROVALS])"
                    target-id="myApprovals"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_FORMSANDMYREQUESTS])"
                    target-id="myRequests"
                    title="My Request"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryNoticeOfChangePOItemForm v-model="ncpoRequest.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryNoticeOfChangePORequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryNoticeOfChangePORequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryNoticeOfChangePORequestMyRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
