<script setup>
import { useDashboardStatisticsStore } from "@/stores/hrms/dashboardStats"
const stats = useDashboardStatisticsStore()
const { monthlyLates, monthlyLateAbsences } = storeToRefs(stats)
</script>
<template>
    <LayoutBoards title="Lates This Month" :loading="monthlyLateAbsences.isLoading">
        <div class="grid grid-cols-3 md:grid-cols-4 justify-start gap-4 p-2 max-h-96 overflow-y-scroll">
            <div v-if="monthlyLates.list.length <= 0">
                No Lates found this month.
            </div>
            <div v-for="employee, index in monthlyLates.list" :key="index" class="flex flex-col items-center">
                <HrmsDashboardLatesItem
                    title="Generate Memo"
                    :name="employee.fullname_first"
                    :avatar="employee.profile_photo && employee.profile_photo.base64 !== 'File doesn\'t exists.' ? employee.profile_photo.base64 : '/avatarexample.png'"
                    :late="employee.total_lates"
                />
            </div>
        </div>
    </LayoutBoards>
</template>
