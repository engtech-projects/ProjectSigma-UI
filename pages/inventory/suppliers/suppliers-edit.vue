<script lang="ts" setup>
useHead({
    title: "Edit Procurement Suppliers",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_procurement_edit,
        ])"
        class="w-full"
    >
        <HrmsCommonTabsMainContainer>
            <InventorySuppliersSupplierForm />
        </HrmsCommonTabsMainContainer>
    </LayoutAcessContainer>
</template>
