<script setup>
import { useDashboardStatisticsStore } from "@/stores/hrms/dashboardStats"
const stats = useDashboardStatisticsStore()
const { genderStats } = storeToRefs(stats)
onMounted(() => {
    stats.getGenderStats()
})
</script>
<template>
    <LayoutBoards title="Total Number of Male and Female Employee" :loading="genderStats.isLoading">
        <LayoutChartDoughnut
            v-if="genderStats.list.length > 0"
            :labels="Object.keys(genderStats.list)"
            :datas="Object.values(genderStats.list)"
        />
    </LayoutBoards>
</template>
