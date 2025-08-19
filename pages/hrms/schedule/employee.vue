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
        <div class="flex gap-2">
            <HrmsScheduleEmployeeCreateForm class="w-1/4" />
            <HrmsScheduleEmployeeEditForm class="w-1/4" />
            <HrmsScheduleEmployeeCalendarView class="w-3/4" />
        </div>
    </LayoutAcessContainer>
</template>
