<script lang="ts" setup>
import { useHrmsEnumsStore } from "@/stores/hrms/enum"
const enums = useHrmsEnumsStore()
const { departmentEnum } = storeToRefs(enums)
onMounted(() => {
    if (!departmentEnum.value.isLoaded) {
        enums.getDepartmentEnums()
    }
})
const model = defineModel({ required: false, type: Number, default: null })
defineProps({
    showAll: { type: Boolean, default: false }
})
</script>
<template>
    <select v-model="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        <option :value="null" disabled selected>
            Choose Department
        </option>
        <option v-if="showAll" :value="null">
            All
        </option>
        <option v-for="dpt, index in departmentEnum.list" :key="index" :value=" dpt.id">
            {{ dpt.department_name }}
        </option>
    </select>
</template>
