<script setup>
import { useAnnouncements } from "@/stores/hrms/announcements"
import { useDashboardStatisticsStore } from "@/stores/hrms/dashboardStats"
const stats = useDashboardStatisticsStore()
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
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_dashboard,
        ])"
    >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
            <div
                class="grid-cols-2 border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardAnnouncementTimeline />
            </div>
            <div
                class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardBirthdaysCard />
            </div>
            <div
                class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardLatesCard />
            </div>
            <div
                class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardAbsencesCard />
            </div>
            <div
                class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardLatesAbsencesChart :labels="Object.keys(stats.latesAbsencesSummary)" :data="Object.values(stats.latesAbsencesSummary)" />
            </div>
            <div
                class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardAssignmentLocationChart />
            </div>
            <div
                class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardGenderChart />
            </div>
        </div>
    </LayoutAcessContainer>
</template>
