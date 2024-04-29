<script setup>
import { useAnnouncements } from "@/stores/hrms/announcements"
import { useDashboardStatisticsStore } from "@/stores/hrms/dashboardStats"
const config = useRuntimeConfig()
const mains = useAnnouncements()
const stats = useDashboardStatisticsStore()
stats.getMonthlyBirthday()
stats.getMonthlyLates()
stats.getMonthlyAbsences()
stats.getLatesAbsenceStats()
stats.getDeptProjStats()
stats.getGenderStats()
mains.getactiveAll()
const { latesAbsenceStats, deptProjStats, genderStats } = storeToRefs(stats)
useHead({
    title: "Dashboard",
    meta: [{ name: "description", content: "SIGMA Dashboard" }],
    bodyAttrs: {
        class: "test",
    },
})
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
        <div
            class="grid-cols-2 border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardAnnouncementTimeline />
        </div>
        <div
            class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardBirthdaysCard
                :employees="stats.monthlyBirthdays.list"
                class="md: mt-2 md:mt-0 p-2"
            />
        </div>
        <div
            class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardLatesCard
                :employees="stats.monthlyLates.list"
                class="md: mt-2 md:mt-0 p-2"
            />
        </div>
        <div
            class="border-gray-300 rounded-lg dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardAbsencesCard
                :employees="stats.monthlyAbsences.list"
                class="md: mt-2 md:mt-0 p-2"
            />
        </div>
        <template v-if="config.public.APP_ENV == 'local'">
            <div
                class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
            >
                <HrmsDashboardLatesAbsencesChart :labels="Object.keys(latesAbsenceStats.list)" :data="Object.values(latesAbsenceStats.list)" />
            </div>
        </template>
        <div
            class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardAssignmentLocationChart :labels="Object.keys(deptProjStats.list)" :data="Object.values(deptProjStats.list)" />
        </div>
        <div
            class="rounded-lg border-gray-300 dark:border-gray-600 h-full md:h-full"
        >
            <HrmsDashboardGenderChart :labels="Object.keys(genderStats.list)" :data="Object.values(genderStats.list)" />
        </div>
    </div>
</template>
