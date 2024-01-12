<script setup lang="ts">
definePageMeta({
    layout: "default",
})
useHead({
    title: "Biometrics Account",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>

<template>
    <div class="mt-10 md:mt-0 md:flex gap-2 ">
        <HrmsAttendanceBiometricAccount class="mb-4 md:w-3/4" />
        <HrmsAttendanceUploadAttendance class="md:w-1/3" />
    </div>
</template>
