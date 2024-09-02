<script setup>
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"

const main = useItemProfileStore()
main.getItemProfile()

useHead({
    title: "Item Profile List",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_item_profile_group,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <InventoryItemProfileItemList />
        </div>
    </LayoutAcessContainer>
</template>
