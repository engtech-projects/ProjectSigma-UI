<script lang="ts" setup>
import { useStockTransferStore } from "~/stores/inventory/stocktransfer"
const mainStore = useStockTransferStore()
const { stockTransfer } = storeToRefs(mainStore)
useHead({
    title: "Stock Transfer",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([AccessibilityTypes.inventory_warehouse_stock_transfer_group,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.inventory_warehouse_stock_transfer_forms_and_my_requests])"
                    target-id="Form"
                    title="Stock Transfer"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.inventory_warehouse_stock_transfer_all_request])"
                    target-id="allRequest"
                    title="All Request"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Form">
                    <InventoryStockTransferForm v-model="stockTransfer.form" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="allRequest">
                    <InventoryStockTransferRequestAllRequests />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
