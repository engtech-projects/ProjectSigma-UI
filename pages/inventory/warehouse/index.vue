<script lang="ts" setup>
import { useWarehouseStore } from "@/stores/inventory/warehouse"
useHead({
    title: "Warehouse",
})
const warehouseStore = useWarehouseStore()
const { warehouse, stocks } = storeToRefs(warehouseStore)

const headers = [
    { name: "Item Code", id: "item_code" },
    { name: "Stocks", id: "stocks" },
]
</script>
<template>
    <div class="grid grid-cols-1 gap-4 w-full max-w-4xl">
        <InventoryWarehouseFilter :data="warehouse" />
        <InventoryWarehouseTable :header-columns="headers" title="Stocks Details" :data="stocks.data" />
    </div>
</template>
