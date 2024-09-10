<script setup>
import { useDashboardStatisticsStore } from "@/stores/hrms/dashboardStats"
const stats = useDashboardStatisticsStore()
const { deptProjStats } = storeToRefs(stats)
onMounted(() => {
    stats.getDeptProjStats()
})
</script>
<template>
    <LayoutBoards title="Employees Chart" :loading="deptProjStats.isLoading">
        <LayoutChartDoughnut
            v-if="deptProjStats.list.length > 0"
            :labels="Object.keys(deptProjStats.list)"
            :datas="Object.values(deptProjStats.list)"
        />
    </LayoutBoards>
</template>
