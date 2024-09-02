<script setup>
import { useItemProfileStore } from "@/stores/inventory/itemprofiles"
const main = useItemProfileStore()
const { myApprovals } = storeToRefs(main)
// import { useTravelorderStore } from "@/stores/hrms/travelorder"
// const travels = useTravelorderStore()
// travels.getMyRequests()
// travels.getMyApprovalRequests()
// travels.getTravelorders()

await main.getUOM()

if (!myApprovals.value.isLoaded) {
    myApprovals.value.isLoaded = true
    main.getMyApprovals()
}

useHead({
    title: "New Item Profile",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.inventory_item_profile_group,
        ])"
    >
        <div
            class="grid grid-cols-1 gap-4"
        >
            <div class="col-span-1">
                <InventoryItemProfileTable />
            </div>
            <div class="col-span-1">
                <InventoryItemProfileTabList />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
