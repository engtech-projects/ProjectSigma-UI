<script setup>
import { useInventoryEnumsStore } from "@/stores/inventory/enum"
const enums = useInventoryEnumsStore()
await enums.getUserEmployeeEnums()
useHead({
    title: "Approvals",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_setup_approvals,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <InventorySetupApprovalsForm />
        </div>
    </LayoutAcessContainer>
</template>
