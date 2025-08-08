<script setup>
import { useItemProfileStore, APPROVAL_NEW_ITEM_PROFILE } from "@/stores/inventory/itemprofiles"
const main = useItemProfileStore()
main.getApprovalByName(APPROVAL_NEW_ITEM_PROFILE)
main.getAllRequests()
main.getMyRequests()
main.getMyApprovals()
main.getUOM()

useHead({
    title: "New Item Profile",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_new_item_profile,
        ])"
    >
        <div class="grid grid-cols-1 gap-4">
            <div class="col-span-1">
                <InventoryItemProfileTable />
            </div>
            <div class="col-span-1">
                <InventoryItemProfileTabList />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
