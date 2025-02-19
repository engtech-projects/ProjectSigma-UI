<script setup>
import { useRoute } from "vue-router"
import { useReceivingStore } from "@/stores/inventory/receiving"
const mainStore = useReceivingStore()
const { receiving } = storeToRefs(mainStore)
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
    { name: "Unit of Measurement", id: "uom" },
    { name: "Unit Price", id: "unit_price" },
    { name: "Ext. Price", id: "ext_price" },
    { name: "Status", id: "status" },
    { name: "Remarks", id: "remarks" },
]

useHead({
    title: "Materials Receiving Report",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.admin,
        ])"
    >
        <template v-if="validKey">
            <InventoryReceivingDetails title="Materials Receiving Report" :data="receiving.details" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
