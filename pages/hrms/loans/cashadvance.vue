<script setup lang="ts">
useHead({
    title: "Cash Advance",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_loans_and_advances_cash_advance_group,
        ])"
    >
        <HrmsCashadvanceTabs />
    </LayoutAcessContainer>
</template>
