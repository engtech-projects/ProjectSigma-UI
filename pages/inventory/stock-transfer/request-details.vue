<script setup>
import { useRoute } from "vue-router"
import { useStockTransferStore } from "@/stores/inventory/stocktransfer"
const mainStore = useStockTransferStore()
const { stockTransfer } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    { name: "Quantity", id: "qty" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "item_id" },
    { name: "Condition or Status", id: "condition" },
    { name: "Remarks", id: "remarks" },
]

useHead({
    title: "Stock Transfer",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_warehouse_stock_transfer_group,
        ])"
    >
        <template v-if="validKey">
            <InventoryStockTransferDetails title="Stock Transfer" :data="stockTransfer.details" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
