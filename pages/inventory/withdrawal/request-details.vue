<script setup>
import { useRoute } from "vue-router"
import { useWithdrawalStore } from "@/stores/inventory/withdrawal"
const mainStore = useWithdrawalStore()
const { withdrawal } = storeToRefs(mainStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await mainStore.getOne(route.query.key)
} else {
    validKey.value = false
}

const headers = [
    { name: "Item Code", id: "item_code" },
    { name: "Item Description", id: "item_profile" },
    { name: "Specification", id: "specification" },
    { name: "Actual Brand Purchase", id: "actual_brand" },
    { name: "Quantity", id: "qty" },
    { name: "Accepted Quantity", id: "accepted_qty" },
    { name: "Unit of Measurement", id: "uom" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Ext. Price", id: "ext_price" },
    { name: "Status", id: "status" },
    { name: "Remarks", id: "remarks" },
    { name: "Action", id: "" },
]

useHead({
    title: "Withdrawal Slip",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_warehouse_withdrawal_group,
        ])"
    >
        <template v-if="validKey">
            <InventoryWithdrawalDetails title="Withdrawal Slip" :data="withdrawal.details" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
