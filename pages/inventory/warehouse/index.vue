<script lang="ts" setup>
import { useWarehouseStore } from "@/stores/inventory/warehouse"

useHead({
    title: "Warehouse",
})

const main = useWarehouseStore()

const headers = [
    { name: "Item Code", id: "item_code" },
    { name: "Stocks", id: "stocks" },
]
</script>
<template>
    <div class="grid grid-cols-1 gap-4">
        <InventoryWarehouseTable :header-columns="headers" title="Stocks" :data="main.Stocks.data" />
    </div>
</template>
