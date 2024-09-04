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
            AccessibilityTypes.inventory_item_profile,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <InventoryItemProfileList />
        </div>
    </LayoutAcessContainer>
</template>
