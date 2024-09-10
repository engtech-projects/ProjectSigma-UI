<script setup>

useHead({
    title: "QR Code",
    meta: [{ name: "QR Login", content: "" }],
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_qr_login,
        ])"
    >
        <div class="w-full">
            <HrmsAttendanceQrLogin />
        </div>
    </LayoutAcessContainer>
</template>
