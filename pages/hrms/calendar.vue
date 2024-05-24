<script setup lang="ts">
useHead({
    title: "Calendar",
    meta: [
        { name: "description", content: "" }
    ],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_event_calendar,
        ])"
    >
        <div class="w-full">
            <HrmsEventsCalendarView />
        </div>
    </LayoutAcessContainer>
</template>
