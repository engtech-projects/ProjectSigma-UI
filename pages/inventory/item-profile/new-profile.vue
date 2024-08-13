<script setup lang="ts">
import { useTravelorderStore } from "@/stores/hrms/travelorder"
import { useEnumsStore } from "@/stores/hrms/enum"

const travels = useTravelorderStore()
// const { isEdit } = storeToRefs(travels)
travels.getMyRequests()
travels.getMyApprovalRequests()
travels.getTravelorders()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
enums.getDepartmentEnums()
enums.getProjectEnums()
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
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div>
                <InventoryItemProfileNewItemProfileForm />
            </div>
            <div>
                <InventoryItemProfileTabList />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
