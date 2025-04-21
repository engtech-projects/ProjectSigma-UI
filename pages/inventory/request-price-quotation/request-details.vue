<script setup>
import { useRoute } from "vue-router"
import { usePriceQuotationStore } from "~/stores/inventory/procurement/pricequotation"
const mainStore = usePriceQuotationStore()
const { priceQuotation } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    // await mainStore.getOne(route.query.key)
    priceQuotation.value = {
        date: "2025-04-16",
        supplier_name: "Acme Supplies Inc.",
        address: "123 Sample Street, Cityville",
        contact_person: "Jane Doe",
        contact_no: "09123456789",
        quotation_no: "Q-2025-001",
        conso_reference_no: "CRN-2025-01",
        items: [
            {
                id: 1,
                item_id: "Item 1",
                specification: "Spec 1",
                qty: 1,
                unit: "Unit 1",
                preferred_brand: "Brand A",
                actual_brand: "Brand A",
                unit_price: 100,
                remarks: "Sample remark",
            },
            {
                id: 2,
                item_id: "Item 2",
                specification: "Spec 2",
                qty: 2,
                unit: "Unit 2",
                preferred_brand: "Brand B",
                actual_brand: "Brand B",
                unit_price: 200,
                remarks: "Another remark",
            },
        ],
    }
} else {
    validKey.value = false
    priceQuotation.value = {
        details: []
    }
}

const headers = [
    { name: "Item Description", id: "item_id" },
    { name: "Specification", id: "specification" },
    { name: "Quantity", id: "qty" },
    { name: "UOM", id: "unit" },
    { name: "Preferred Brand", id: "preferred_brand" },
    { name: "Actual Brand", id: "actual_brand" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Remarks During Canvass", id: "remarks" },
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
            <InventoryPriceQuotationDetails title="Request For Price Quotation" :data="priceQuotation" :header-columns="headers" />
            <!-- :data="priceQuotation.details" -->
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
