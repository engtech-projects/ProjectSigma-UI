<script lang="ts" setup>
import { useWithdrawalStore } from "~/stores/inventory/withdrawal"
const mainStore = useWithdrawalStore()
const { withdrawal } = storeToRefs(mainStore)
useHead({
    title: "Withdrawal",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_WITHDRAWAL_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_WITHDRAWAL_FORMSANDMYREQUESTS])"
                    target-id="Form"
                    title="Withdrawal Form"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_WITHDRAWAL_ALLREQUEST])"
                    target-id="allRequest"
                    title="All Request"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_WAREHOUSE_WITHDRAWAL_MYAPPROVALS,
                    ])"
                    target-id="myApprovals"
                    title="My Approvals"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.INVENTORY_WAREHOUSE_WITHDRAWAL_FORMSANDMYREQUESTS,
                    ])"
                    target-id="myRequests"
                    title="My Request"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryWithdrawalForm v-model="withdrawal.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryWithdrawalRequestAllRequests />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myApprovals">
                    <InventoryWithdrawalRequestMyApprovals />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="myRequests">
                    <InventoryWithdrawalRequestMyRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
