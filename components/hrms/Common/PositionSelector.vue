<script lang="ts" setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { positionEnum } = storeToRefs(enums)
if (positionEnum.value.list.length <= 0) {
    enums.getPositionEnums()
}
const model = defineModel({ required: false, type: Number, default: null })
</script>
<template>
    <select v-model="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option :value="null" disabled selected>
            Choose Position
        </option>
        <option v-for="data, index in positionEnum.list" :key="index" :value="data.id">
            {{ data.name.split(",")[0] }} - {{ data.department_name }}
        </option>
    </select>
</template>
