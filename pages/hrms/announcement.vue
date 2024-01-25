<script setup>
import { storeToRefs } from "pinia"
import { useMain } from "@/stores/announcements"

const mains = useMain()
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
