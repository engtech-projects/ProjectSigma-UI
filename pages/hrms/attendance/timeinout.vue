<script setup lang="ts">
definePageMeta({
    layout: "default",
})
useHead({
    title: "Daily Logs Record",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>

<template>
    <div class="mt-10 md:mt-0 md:flex gap-2">
        <EmployeeInfoSheet />
        <HrmsAttendanceInOut />
    </div>
</template>
