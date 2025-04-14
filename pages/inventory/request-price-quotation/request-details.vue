<script setup>
import { useRoute } from "vue-router"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
const mainStore = usePriceQuotationStore()
const { priceQuotation } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    { name: "Item Description", id: "item_profile" },
    { name: "Specification", id: "specification" },
    { name: "Quantity", id: "qty" },
    { name: "UOM", id: "uom" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Actual Brand", id: "actual_brand" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Remarks", id: "remarks" },
    { name: "Action", id: "" },
]

useHead({
    title: "Request Price Quotation",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_PROCUREMENT_REQUEST_PRICE_QUOTATION_GROUP,
        ])"
    >
        <template v-if="validKey">
            <InventoryPriceQuotationDetails title="Request Details" :data="priceQuotation.details" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
