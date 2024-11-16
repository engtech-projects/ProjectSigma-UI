<script setup>
import { useRoute } from "vue-router"
import { useBOMStore } from "@/stores/inventory/bom"
const route = useRoute()
const main = useBOMStore()
const { bomRequest } = storeToRefs(main)
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await main.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    { name: "Item", id: "item_summary" },
    { name: "Unit", id: "uom_id" },
    { name: "Price", id: "unit_price" },
    { name: "Quantity", id: "quantity" },
    { name: "Amount", id: "amount" },
]
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_bom_group,
        ])"
    >
        <template v-if="validKey">
            <InventoryBomDetails title="BOM Details" :data="bomRequest.bomDetails.list" :request="bomRequest.bomDetails" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
