<script setup lang="ts">
useHead({
    title: "Employee QR Code",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_qr_code,
        ])"
    >
        <div class="w-full">
            Employee QR
        </div>
    </LayoutAcessContainer>
</template>
