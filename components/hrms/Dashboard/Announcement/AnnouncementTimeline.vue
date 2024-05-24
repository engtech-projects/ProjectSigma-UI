<script setup>
import { storeToRefs } from "pinia"
import { useAnnouncements } from "@/stores/hrms/announcements"

const mains = useAnnouncements()

const { activeList: mainList } = storeToRefs(mains)
const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
}
</script>

<template>
    <LayoutBoards title="Announcement">
        <div v-if="mainList!=''" class="h-full max-h-full overflow-auto">
            <HrmsDashboardAnnouncementHeadline
                class="mb-4 mt-2"
                :title="mainList[0]?.title"
                :date="formatDate(mainList[0]?.start_date)"
                :content="mainList[0]?.content"
            />
            <HrmsDashboardAnnouncementCard
                v-for="(data, index) in mainList.slice(1)"
                :key="index"
                :title="data.title"
                :date="formatDate(data.start_date)"
                :content="data.content"
            />
        </div>
        <div v-if="mainList==''">
            <HrmsDashboardAnnouncementHeadline
                class="mb-4 mt-2"
                title="No Announcement"
            />
        </div>
    </LayoutBoards>
</template>
