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
        <LayoutBoards title="EDIT SUPPLIER ACCREDITATION FORM" class="w-full" :loading="editRequest.isLoading">
            <InventorySuppliersSupplierForm v-model="editRequest.form" />
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
