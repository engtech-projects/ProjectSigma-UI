<script setup>
useHead({
    title: "Employee Work Locations",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.HRMS_LOCATION_EMPLOYEES,
        ])"
    >
        <div
            class="md:flex gap-2"
        >
            <HrmsProjectAssign />
        </div>
    </LayoutAcessContainer>
</template>
