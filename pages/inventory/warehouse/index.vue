<script lang="ts" setup>
import { useWarehouseStore } from "@/stores/inventory/warehouse"
useHead({
    title: "Warehouse",
})
const warehouseStore = useWarehouseStore()
const { stocks, logs } = storeToRefs(warehouseStore)

const headersStocks = [
    { name: "Item Code", id: "item_codename" },
    { name: "Stocks", id: "quantity" },
]
const headersLogs = [
    { name: "Transaction Date", id: "transaction_date" },
    { name: "Transaction Type", id: "transaction_type" },
    { name: "Item Code", id: "item_code" },
    { name: "Deduction / Addition of Stock", id: "movement" },
]

const showInformation = (data) => {
    entryData.value = data
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
        class="w-full"
    >
        <div class="flex flex-col md:flex-row gap-4 w-full">
            <div class="w-full md:w-1/2 min-w-0">
                <InventoryWarehouseFilter />
            </div>
            <div class="w-full md:w-1/2 min-w-0">
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
                            <LayoutLoadingContainer
                                v-if="stocks.list"
                                class="w-full"
                                :loading="stocks.isLoading"
                            >
                                <LayoutPsTable
                                    :header-columns="headersStocks"
                                    :actions="actions"
                                    :datas="stocks.list ?? []"
                                    @show-table="showInformation"
                                />
                            </LayoutLoadingContainer>
                        </HrmsCommonTabsTabContainer>
                        <HrmsCommonTabsTabContainer id="Logs">
                            <LayoutLoadingContainer
                                v-if="logs.list"
                                class="w-full"
                                :loading="logs.isLoading"
                            >
                                <LayoutPsTable
                                    :header-columns="headersLogs"
                                    :datas="logs.list ?? []"
                                />
                            </LayoutLoadingContainer>
                        </HrmsCommonTabsTabContainer>
                    </template>
                </HrmsCommonTabsMainContainer>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
