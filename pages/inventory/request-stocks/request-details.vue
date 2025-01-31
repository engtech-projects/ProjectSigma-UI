<script setup>
import { useRoute } from "vue-router"
import { useRequestStockStore } from "@/stores/inventory/requeststock"
const mainStore = useRequestStockStore()
const { requestStock } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    // { name: "Quantity", id: "items.quantity" },
    // { name: "Unit", id: "items.unit" },
    // { name: "Item Description", id: "item_desc.item_description" },
    // { name: "Specification", id: "items.specification" },
    // { name: "Preferred Brand", id: "items.preferred_brand" },
    // { name: "Reason", id: "items.reason" },
    // { name: "Location", id: "items.location" },
    // { name: "Location Qty", id: "items.location_qty" },
    { name: "Quantity", id: "quantity" },
    { name: "Unit", id: "unit" },
    { name: "Item Description", id: "item_id" },
    { name: "Specification", id: "specification" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Reason", id: "reason" },
    { name: "Location", id: "location" },
    { name: "Location Qty", id: "location_qty" },
    { name: "Status", id: "" },
]

useHead({
    title: "Request Stocks",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_request_stock_group,
        ])"
    >
        <template v-if="validKey">
            <InventoryRequestStockDetails title="Requisition Slip" :data="requestStock.details" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
