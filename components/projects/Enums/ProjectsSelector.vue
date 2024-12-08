<script setup lang="ts">
import { useProjectEnumsStore } from "@/stores/project-monitoring/enum"
const enums = useProjectEnumsStore()
const { projectEnum } = storeToRefs(enums)
onMounted(() => {
    if (!projectEnum.value.isLoaded) {
        enums.getProjectEnums()
    }
})
const model = defineModel({ required: false, type: Number, default: null })
defineProps({
    showAll: { type: Boolean, default: false },
})
</script>
<template>
    <select
        v-model="model"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
    >
        <option :value="null" disabled selected>
            Choose Project
        </option>
        <option v-if="showAll" :value="null">
            All
        </option>
        <option v-for="data, index in projectEnum.list" :key="index" :value="data.id">
            {{ data.project_code }}  - {{ data.contract_name }}
        </option>
    </select>
</template>
