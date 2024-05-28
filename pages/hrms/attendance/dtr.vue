<script setup lang="ts">
useHead({
    title: "Daily Logs Record",
    meta: [
        { name: "description", content: "" }
    ],
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_daily_logs_record_form,
            AccessibilityTypes.hrms_attendance_daily_logs_record_list,
            AccessibilityTypes.hrms_attendance_daily_logs_record_approval,
        ])"
    >
        <div class="mt-10 md:mt-0 md:flex gap-2">
            <div class="w-full md:w-1/3">
                <HrmsEmployee201SearchProfile />
            </div>
            <HrmsAttendanceInOut />
        </div>
    </LayoutAcessContainer>
</template>
