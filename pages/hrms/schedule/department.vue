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
        <div class="flex gap-2">
            <HrmsScheduleDeptCreateForm class="w-1/4" />
            <HrmsScheduleDeptEditForm class="w-1/4" />
            <HrmsScheduleDeptCalendarView class="w-3/4" />
        </div>
    </LayoutAcessContainer>
</template>
