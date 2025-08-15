<script setup lang="ts">
useHead({
    title: "Overtime"
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_lnotnto_overtime_group,
        ])"
    >
        <HrmsOvertimeTabs />
    </LayoutAcessContainer>
</template>
