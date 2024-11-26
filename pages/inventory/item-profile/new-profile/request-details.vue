<script setup>
import { useRoute } from "vue-router"
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const profileStore = useItemProfileStore()
const { page } = storeToRefs(profileStore)
const route = useRoute()
const validKey = ref(false)
if (route.query.key) {
    validKey.value = true
    await profileStore.getOne(route.query.key)
} else {
    validKey.value = false
}

await profileStore.getUOM()

const headers = [
    { name: "Item Code", id: "item_code" },
    { name: "Item description", id: "item_description" },
    { name: "Thickness", id: "thickness" },
    { name: "Length", id: "length" },
    { name: "Width", id: "width" },
    { name: "Height", id: "height" },
    { name: "Outside diameter", id: "outside_diameter" },
    { name: "Inside diameter", id: "inside_diameter" },
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
            AccessibilityTypes.inventory_item_profile,
        ])"
    >
        <template v-if="validKey">
            <InventoryItemProfileDetails title="Item Profile Details" :data="page.list.item_profile" :request="page.list" :header-columns="headers" />
        </template>
        <template v-else>
            <div class="grid grid-cols-1 gap-4">
                <h2> 404 NOT FOUND</h2>
            </div>
        </template>
    </LayoutAcessContainer>
</template>
