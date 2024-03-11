<script setup>
import { useSalaryGradeStore } from "~/stores/hrms/salarygrade"

useHead({
    title: "Salary Grade",
})

const salaryGradeStore = useSalaryGradeStore()
</script>

<template>
    <div class="mt-10 md:flex gap-4">
        <HrmsSalaryGradeEdit v-if="salaryGradeStore.isEdit" class="flex-1" />
        <HrmsSalaryGradeNew v-else class="flex-1" />
        <HrmsSalaryGradeList class="flex-2" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
