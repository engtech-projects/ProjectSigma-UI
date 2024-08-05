<script setup>

useHead({
    title: "QR Code",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_qr_generator,
        ])"
    >
        <div class="w-full">
            <HrmsAttendanceQrGenerator />
        </div>
    </LayoutAcessContainer>
</template>
