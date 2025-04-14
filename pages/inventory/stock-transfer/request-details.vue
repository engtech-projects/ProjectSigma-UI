<script setup>
import { useRoute } from "vue-router"
import { ref, computed } from "vue"
import { useStockTransferStore } from "@/stores/inventory/stocktransfer"

const mainStore = useStockTransferStore()
const { stockTransfer } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)

// Dummy data for development and testing
const dummyStockTransfer = ref({
    details: {
        id: 1,
        date: "2025-04-10",
        from_section: "Warehouse A",
        to_section: "Warehouse B",
        reference_no: "ST-2025-0001",
        total_net_of_vat_cost: 15000,
        total_input_vat: 1800,
        grand_total: 16800,
        items: [
            {
                id: 101,
                item_id: "Laptop Computer",
                qty: 5,
                accepted_qty: 5,
                unit: "Units",
                condition: "Good",
                remarks: "Accepted"
            },
            {
                id: 102,
                item_id: "Office Chair",
                qty: 10,
                accepted_qty: 8,
                unit: "Units",
                condition: "Good",
                remarks: "Accepted"
            },
            {
                id: 103,
                item_id: "Printer",
                qty: 2,
                accepted_qty: 0,
                unit: "Units",
                condition: "Damaged",
                remarks: "Rejected"
            },
            {
                id: 104,
                item_id: "Standing Desk",
                qty: 3,
                accepted_qty: 0,
                unit: "Units",
                condition: "Good",
                remarks: "Accepted"
            }
        ]
    },
    isLoading: false
})

// Load real data if key is provided, otherwise use dummy data
if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    // For development/testing, set valid to true to show the component with dummy data
    validKey.value = true
    // In production, you might want to set this to false
    // validKey.value = false
}

// Data to be used in the component
const displayData = computed(() => {
    return route.query.key ? stockTransfer.value.details : dummyStockTransfer.value.details
})

// Loading state
const isLoading = computed(() => {
    return route.query.key ? stockTransfer.value.isLoading : false
})

const headers = [
    { name: "Item Description", id: "item_id" },
    { name: "Quantity", id: "qty" },
    { name: "Unit", id: "unit" },
    { name: "Condition", id: "condition" },
    { name: "Remarks", id: "remarks" },
    { name: "Actions", id: "actions" }
]

useHead({
    title: "Stock Transfer",
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.INVENTORY_WAREHOUSE_STOCK_TRANSFER_GROUP,
        ])"
    >
        <template v-if="validKey">
            <InventoryStockTransferDetails
                title="Stock Transfer"
                :data="displayData"
                :header-columns="headers"
                :loading="isLoading"
            />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2 class="text-2xl font-bold text-red-600">
                    404 NOT FOUND
                </h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
