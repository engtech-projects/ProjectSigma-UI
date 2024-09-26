<script setup lang="ts">

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
            </div>
            <div>
                <HrmsTravelOrderTabList />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
