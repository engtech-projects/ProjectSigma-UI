<script setup>
useHead({
    title: "Project Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_schedule_project,
        ])"
    >
        <HrmsScheduleProject />
    </LayoutAcessContainer>
</template>
