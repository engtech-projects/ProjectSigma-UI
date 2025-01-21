<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { projectsEnum } = storeToRefs(enums)
const props = defineProps({
    stakeholderId: { type: Boolean, default: true },
    selectType: { type: String, default: "" },
})
const projectInfo = defineModel("projectInfo", { required: false, type: Object, default: {} })

watch(projectInfo, (newValue) => {
    projectInfo.value = newValue
})
watch(() => props.selectType, (newValue) => {
    if (!projectsEnum.value.isLoaded && newValue === "project") {
        enums.getProjectsEnums()
    }
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
