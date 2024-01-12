<script setup lang="ts">
definePageMeta({
    layout: "default",
}),

useHead({
    title: "Attendance Login",
    meta: [
        { name: "description", content: "" }
    ],

})

</script>

<template>
    <div class="mt-10 md:mt-0">
        <HrmsAttendanceLogin />
    </div>
</template>
