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
        <HrmsTravelOrderTabList />
    </LayoutAcessContainer>
</template>
