<template>
    <div>
        <HrmsDashboardCalendar />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "default",
}),

useHead({
    title: "Calendar",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
