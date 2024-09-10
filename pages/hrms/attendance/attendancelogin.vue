<script setup lang="ts">
useHead({
    title: "Attendance Login",
    meta: [
        { name: "description", content: "" }
    ],

})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_attendance_login,
        ])"
    >
        <div class="mt-10 md:mt-0">
            <HrmsAttendanceLogin />
        </div>
    </LayoutAcessContainer>
</template>
