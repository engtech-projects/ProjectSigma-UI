<script lang="ts" setup>
import { useSupplierStore } from "@/stores/inventory/suppliers"
useHead({
    title: "Edit Procurement Suppliers",
})
const mainStore = useSupplierStore()
const { editRequest } = storeToRefs(mainStore)
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_edit,
        ])"
        class="w-full"
    >
        <InventorySuppliersSupplierForm v-model="editRequest.form" />
    </LayoutAcessContainer>
</template>
