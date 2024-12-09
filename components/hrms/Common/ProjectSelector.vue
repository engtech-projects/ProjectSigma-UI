<script setup lang="ts">
import { useHrmsEnumsStore } from "@/stores/hrms/enum"
const enums = useHrmsEnumsStore()
const { projectEnum } = storeToRefs(enums)
onMounted(() => {
    if (!projectEnum.value.isLoaded) {
        enums.getProjectEnums()
    }
})
const model = defineModel({ required: false, type: Number, default: null })
defineProps({
    showAll: { type: Boolean, default: false },
    useHrmsId: { type: Boolean, default: true },
})
const testData = ref({})
</script>
<template>
    <LayoutFormPsSelectSearch
        v-model:result="testData"
        v-model:result-id="model"
        v-model:search-input="projectEnum.localFilter.project_code"
        :search-list="enums.filteredProjectsList"
        :loading="projectEnum.isLoading"
        title="project_code"
        placeholder="Search Project"
    />
</template>
