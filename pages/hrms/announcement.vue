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
        <HrmsAnnouncementForm
            v-show="!isEdit"
            v-if="useCheckAccessibility([
                AccessibilityTypes.hrms_announcement_form,
            ])"
            class="w-full"
        />
        <HrmsAnnouncementEditAnnouncementForm
            v-show="isEdit"
            v-if="useCheckAccessibility([
                AccessibilityTypes.hrms_announcement_form,
            ])"
            class="w-full"
        />
        <HrmsAnnouncementList
            v-if="useCheckAccessibility([
                AccessibilityTypes.hrms_announcement_list,
            ])"
            class="w-full"
        />
    </div>
</template>
