<script setup lang="ts">
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
const { projectEnum } = storeToRefs(enums)
if (projectEnum.value.list.length <= 0) {
    enums.getProjectEnums()
}
const model = defineModel({ required: false, type: Number, default: null })
defineProps({
    showAll: { type: Boolean, default: false },
    useHrmsId: { type: Boolean, default: false },
})
</script>
<template>
    <select v-model="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option :value="null" disabled selected>
            Choose Project
        </option>
        <option v-if="showAll" :value="null">
            All
        </option>
        <option v-for="data, index in projectEnum.list" :key="index" :value="useHrmsId ? data.id : data.project_monitoring_id">
            {{ data.project_code ?? data.projects.project_code }} - {{ data.contract_name ?? data.projects.contract_name }}
        </option>
    </select>
</template>
