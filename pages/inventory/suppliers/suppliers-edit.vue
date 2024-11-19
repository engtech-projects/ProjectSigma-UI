<script lang="ts" setup>
import { useWarehouseStore } from "@/stores/inventory/warehouse"
useHead({
    title: "Warehouse",
})
const warehouseStore = useWarehouseStore()
const { stocks } = storeToRefs(warehouseStore)

const headers = [
    { name: "Item Code", id: "item_code" },
    { name: "Stocks", id: "stocks" },
]
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_warehouse_group,
        ])"
        class="max-w-4xl"
    >
        <div class="grid grid-cols-1 gap-4 w-full max-w-4xl mb-5">
            <InventoryWarehouseFilter />
        </div>
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_warehouse_group,
                    ])"
                    title="Stocks"
                    target-id="Stocks"
                />
                <HrmsCommonTabsTabTitle
                    :if-access="useCheckAccessibility([
                        AccessibilityTypes.inventory_warehouse_group,
                    ])"
                    title="Logs"
                    target-id="Logs"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer id="Stocks">
                    <InventoryWarehouseTable :header-columns="headers" title="Stocks" :data="stocks.data" />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="Logs">
                    <InventoryWarehouseTableLogs title="Logs" />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
