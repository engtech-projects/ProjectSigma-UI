<script setup>
import { useSalaryGradeStore } from "~/stores/hrms/setup/salarygrade"

useHead({
    title: "Salary Grade",
})

const salaryGradeStore = useSalaryGradeStore()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_setup_salary_grade,
        ])"
    >
        <div class="mt-10 md:flex gap-4 overflow-auto">
            <HrmsSalaryGradeEdit v-if="salaryGradeStore.isEdit" class="flex-1 w-1/3" />
            <HrmsSalaryGradeNew v-else class="flex-1 w-1/3" />
            <HrmsSalaryGradeList class="flex-1 w-2/3" />
        </div>
    </LayoutAcessContainer>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
