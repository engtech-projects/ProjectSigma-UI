<script setup>
import { useDashboardStatisticsStore } from "@/stores/hrms/dashboardStats"
const stats = useDashboardStatisticsStore()
const { monthlyLateAbsences } = storeToRefs(stats)
onMounted(() => {
    if (!monthlyLateAbsences.value.isLoaded) {
        stats.getMonthlyLateAbsences()
    }
})
</script>
<template>
    <LayoutBoards title="Absences This Month" :loading="monthlyLateAbsences.isLoading">
        <div class="grid grid-cols-3 md:grid-cols-4 justify-start gap-4 p-2 max-h-96 overflow-y-scroll">
            <div v-if="monthlyLateAbsences.list.length <= 0">
                No absences found this month.
            </div>
            <div v-for="employee, index in monthlyLateAbsences.list" :key="index" class="flex flex-col items-center">
                <HrmsDashboardAbsencesItem
                    title="Generate Memo"
                    :name="employee.fullname_first"
                    :avatar="employee.profile_photo && employee.profile_photo.base64 !== 'File doesn\'t exists.' ? employee.profile_photo.base64 : '/avatarexample.png'"
                    :absences="employee.total_absents"
                />
            </div>
        </div>
    </LayoutBoards>
</template>
