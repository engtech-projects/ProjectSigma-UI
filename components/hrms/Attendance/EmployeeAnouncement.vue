<script setup>
import { useAnnouncements } from "@/stores/hrms/announcements"
const mains = useAnnouncements()
mains.getactiveAll()

useHead({
    title: "Dashboard",
    meta: [{ name: "description", content: "SIGMA Dashboard" }],
    bodyAttrs: {
        class: "test",
    },
})
</script>

<template>
    <div class="w-full max-h-full">
        <HrmsDashboardAnnouncementTimeline />
    </div>
</template>
