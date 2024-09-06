<script setup lang="ts">
import { useTravelorderStore } from "@/stores/hrms/travelorder"

const travels = useTravelorderStore()
// const { isEdit } = storeToRefs(travels)
travels.getMyRequests()
travels.getMyApprovalRequests()
travels.getTravelorders()
useHead({
    title: "Travel Order",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_lnotnto_travel_order_group,
        ])"
    >
        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div>
                <HrmsTravelOrderRequestForm />
                <!-- <HrmsTravelOrderEditRequest v-show="isEdit" /> -->
            </div>
            <div>
                <HrmsTravelOrderTabList />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
