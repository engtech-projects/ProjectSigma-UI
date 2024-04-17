<script setup>
import { storeToRefs } from "pinia"
import { useAnnouncements } from "@/stores/hrms/announcements"

const mains = useAnnouncements()
const { isEdit } = storeToRefs(mains)
mains.getAll()

useHead({
    title: "Announcement",
})

</script>

<template>
    <div class="flex flex-col gap-3">
        <HrmsAnnouncementForm v-show="!isEdit" />
        <HrmsAnnouncementEditAnnouncementForm v-show="isEdit" />
        <HrmsAnnouncementList />
    </div>
</template>
