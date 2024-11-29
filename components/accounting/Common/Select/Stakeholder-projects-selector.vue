<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { projectsEnum } = storeToRefs(enums)
onMounted(() => {
    if (!projectsEnum.value.isLoaded) {
        enums.getProjectsEnums()
    }
})
const projectInfo = defineModel("projectInfo", { required: false, type: Object, default: {} })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(projectInfo, (newValue) => {
    projectInfo.value = newValue
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="projectInfo"
            v-model:search-input="projectsEnum.params.key"
            :loading="projectsEnum.isLoading"
            :search-list="projectsEnum.list"
            title="name"
            placeholder="Search Projects"
        />
    </div>
</template>
