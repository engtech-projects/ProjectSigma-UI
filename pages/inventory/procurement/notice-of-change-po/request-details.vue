<script setup>
import { useRoute } from "vue-router"
import { useNcpoStore } from "@/stores/inventory/procurement/ncpo"
const mainStore = useNcpoStore()
const { ncpoRequest } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    // await mainStore.getOne(route.query.key)
    ncpoRequest.value = {
        ncpo_no: "NCPO-2025-001",
        po_number: "PO-2025-001",
        po_date: "2025-04-16",
        project_code: "PC-2025-001",
        equipment_no: "EQ-2025-001",
        date: "2025-04-16",
        justification: "Lorem ipsum dolor",
        details: [
            {
                id: 1,
                item_id: "ITEM001",
                specification: "High quality steel",
                quantity: 10,
                uom: "PCS",
                supplier_id: "BrandX",
                unit_price: 100,
                net_of_vat: 950,
                input_vat: 50,
                gross_amount: 1000,
            },
            {
                id: 2,
                item_id: "ITEM002",
                specification: "Heavy duty bolts",
                quantity: 25,
                uom: "SET",
                supplier_id: "BrandY",
                unit_price: 40,
                net_of_vat: 950,
                input_vat: 50,
                gross_amount: 1000,
            },
        ],
    }
} else {
    validKey.value = false
    ncpoRequest.value = {
        details: []
    }
}

const headers = [
    { name: "ITEM NO.", id: "id" },
    { name: "ITEM DESCRIPTION", id: "item_id" },
    { name: "SPECIFICATION", id: "specification" },
    { name: "QTY", id: "quantity" },
    { name: "UOM", id: "uom" },
    { name: "SUPPLIER", id: "supplier_id" },
    { name: "UNIT PRICE", id: "unit_price" },
    { name: "NET OF VAT", id: "net_of_vat" },
    { name: "INPUT VAT", id: "input_vat" },
    { name: "GROSS AMOUNT", id: "gross_amount" },
]

useHead({
    title: "NOTICE OF CHANGES IN PURCHASE ORDERS (NCPO)",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_PROCUREMENT_NOTICEOFCHANGEPURCHASEORDER_GROUP,
        ])"
    >
        <template v-if="validKey">
            <InventoryNoticeOfChangePOChangeDetails title="NOTICE OF CHANGES IN PURCHASE ORDERS (NCPO)" :data="ncpoRequest.details" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
