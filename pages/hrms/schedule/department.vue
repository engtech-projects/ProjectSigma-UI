<script setup>
useHead({
    title: "Department Schedule",
    meta: [{ name: "description", content: "" }],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_schedule_department,
        ])"
    >
        <HrmsScheduleDepartment />
    </LayoutAcessContainer>
</template>
