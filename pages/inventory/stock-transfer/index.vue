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
        :if-access="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_GROUP,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_REQUESTPROCESSING])"
                    target-id="Form"
                    title="Stock Transfer"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_ALLREQUEST])"
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
