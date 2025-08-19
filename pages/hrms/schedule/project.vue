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
        <div class="flex gap-2">
            <HrmsScheduleProjectCreateForm class="w-1/4" />
            <HrmsScheduleProjectEditForm class="w-1/4" />
            <HrmsScheduleProjectCalendarView class="w-3/4" />
        </div>
    </LayoutAcessContainer>
</template>
