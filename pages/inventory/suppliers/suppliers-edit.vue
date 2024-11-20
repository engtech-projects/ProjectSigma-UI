<script lang="ts" setup>
import { useSupplierStore } from "@/stores/inventory/suppliers"
useHead({
    title: "Edit Procurement Suppliers",
})
const mainStore = useSupplierStore()
const { createRequest } = storeToRefs(mainStore)
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_edit,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <InventorySuppliersSupplierForm v-model="createRequest.editForm" />
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
