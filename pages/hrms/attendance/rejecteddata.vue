<script setup lang="ts">
definePageMeta({
    layout: "default",
})
useHead({
    title: "Biometric Rejected Data",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>

<template>
    <div class="mt-10 md:mt-0 md:flex gap-2">
        <HrmsAttendanceRejectedData />
    </div>
</template>
