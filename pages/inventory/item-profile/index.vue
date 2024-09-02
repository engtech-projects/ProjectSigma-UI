<script setup>
import { useRoute } from "vue-router"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const profileStore = useItemProfileStore()
const { page } = storeToRefs(profileStore)
const route = useRoute()
const validKey = ref(false)

if (route.query.key) {
    validKey.value = true
} else {
    validKey.value = false
}

const headers = [
    { name: "SKU", id: "sku" },
    { name: "Item description", id: "item_description" },
    { name: "Thickness", id: "thickness_val" },
    { name: "Length", id: "length_val" },
    { name: "Width", id: "width_val" },
    { name: "Height", id: "height_val" },
    { name: "Outside diameter", id: "outside_diameter_val" },
    { name: "Inside diameter", id: "inside_diameter_val" },
    { name: "Volume", id: "volume_val" },
    { name: "Grade", id: "grade" },
    { name: "Color", id: "color" },
    { name: "UOM", id: "uom" },
    { name: "Inventory Type", id: "inventory_type" },
    { name: "Item Approved", id: "is_approved" },
    { name: "Status", id: "active_status" },
    { name: "Action", id: "" },
]

useHead({
    title: "Item Request",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_item_profile_group,
        ])"
    >
        <template v-if="validKey">
            <InventoryItemProfileDetails title="Item Profile Details" :data="page.list" :data-approval="page.approval.list" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
