<script setup>
useHead({
    title: "Employee Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_schedule_employee,
        ])"
    >
        <HrmsScheduleEmployee />
    </LayoutAcessContainer>
</template>
