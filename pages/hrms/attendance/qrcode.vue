<script setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "QR Code",
    meta: [{ name: "description", content: "" }],
})
</script>

<template>
    <div>
        <HrmsAttendanceQrGenerator />
    </div>
</template>
