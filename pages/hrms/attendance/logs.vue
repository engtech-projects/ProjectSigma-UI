<script setup>

useHead({
    title: "Attendance Logs",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_attendance_logs,
        ])"
    >
        <div>
            <HrmsAttendanceLogs />
        </div>
    </LayoutAcessContainer>
</template>
