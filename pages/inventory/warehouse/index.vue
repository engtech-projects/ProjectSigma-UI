<script lang="ts" setup>
import { useWarehouseStore } from "@/stores/inventory/warehouse"
useHead({
    title: "Warehouse",
})
const warehouseStore = useWarehouseStore()
const { stocks, logs } = storeToRefs(warehouseStore)

const headersStocks = [
    { name: "Item Code", id: "item_code" },
    { name: "Stocks", id: "stocks" },
]
const headersLogs = [
    { name: "Transaction Date", id: "created_at" },
    { name: "Transaction Type", id: "transaction_type" },
    { name: "Item Code", id: "item_code" },
]

const showInformation = (data) => {
    entryData.value = data
    showInformationModal.value = true
}

const actions = {
    showTable: true,
}
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
                    <LayoutPsTable
                        :header-columns="headersStocks"
                        :actions="actions"
                        :datas="stocks.list ?? []"
                        @show-table="showInformation"
                    />
                </HrmsCommonTabsTabContainer>
                <HrmsCommonTabsTabContainer id="Logs">
                    <LayoutPsTable
                        :header-columns="headersLogs"
                        :datas="logs.list ?? []"
                    />
                </HrmsCommonTabsTabContainer>
            </template>
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
