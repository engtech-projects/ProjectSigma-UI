<script setup>
import { storeToRefs } from "pinia"
import { useMain } from "@/stores/announcements"

const mains = useMain()

const { activeList: mainList } = storeToRefs(mains)
const formatDate = (date) => {
    return new Date(date).toLocaleDateString()
}
</script>

<template>
    <LayoutBoards title="Announcement">
        <HrmsDashboardAnnouncementHeadline
            class="mb-4 mt-2"
            :title="mainList[0]?.title"
            :date="formatDate(mainList[0]?.start_date)"
            :content="mainList[0]?.content"
        />
        <HrmsDashboardAnnouncementCard
            v-for="(data, index) in mainList.splice(1)"
            :key="index"
            :title="data.title"
            :date="formatDate(data.start_date)"
            :content="data.content"
        />
    </LayoutBoards>
</template>
