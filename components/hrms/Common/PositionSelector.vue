<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { positionEnum } = storeToRefs(enums)
const model = defineModel({ required: true, type: Array<Number> })
</script>
<template>
    <select v-model="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option value="" disabled selected>
            Choose Position
        </option>
        <option v-for="data, index in positionEnum.list" :key="index" :value=" data.id">
            {{ data.name }}
        </option>
    </select>
</template>
