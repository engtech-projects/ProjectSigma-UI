<script setup>

// import { storeToRefs } from "pinia"
import { useItemStore } from "@/stores/inventory/setup/itemgroup"
import { useEnumsStore } from "@/stores/inventory/enum"

const approvals = useItemStore()
approvals.getApproval()

const enums = useEnumsStore()
enums.getUserEmployeeEnums()

useHead({
    title: "Item Group",
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_setup_approvals,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <InventorySetupItemGroupTable />
        </div>
    </LayoutAcessContainer>
</template>
