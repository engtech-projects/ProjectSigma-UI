<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { salarygradeEnum } = storeToRefs(enums)
const model = defineModel({ required: false, type: Number, default: null })
</script>
<template>
    <select v-model="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option :value="null" disabled selected>
            Choose Salary Grade
        </option>
        <option v-for="(salary, index) in salarygradeEnum.list" :key="index" :value="salary.id">
            Grade {{ salary.salary_grade_level }} - Step {{ salary.step_name }}
        </option>
    </select>
</template>
