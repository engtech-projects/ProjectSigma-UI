<script setup lang="ts">
useHead({
    title: "Biometrics Account",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_biomentrics,
        ])"
    >
        <div class="mt-10 md:mt-0 md:flex gap-2 ">
            <HrmsAttendanceBiometricAccount class="mb-4 md:w-3/4" />
            <HrmsAttendanceUploadAttendance class="md:w-1/3" />
        </div>
    </LayoutAcessContainer>
</template>
