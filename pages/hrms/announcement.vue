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
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_announcement,
        ])"
    >
        <div class="flex flex-col gap-3">
            <HrmsAnnouncementForm
                v-show="!isEdit"
                class="w-full"
            />
            <HrmsAnnouncementEditAnnouncementForm
                v-show="isEdit"
                class="w-full"
            />
            <HrmsAnnouncementList
                class="w-full"
            />
        </div>
    </LayoutAcessContainer>
</template>
