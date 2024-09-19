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
            <HrmsSalaryGradeEdit v-if="salaryGradeStore.isEdit" class="md:flex w-full md:w-1/3" />
            <HrmsSalaryGradeNew v-else class="md:flex w-full md:w-1/3" />
            <HrmsSalaryGradeList class="md:flex w-full md:w-2/3" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
