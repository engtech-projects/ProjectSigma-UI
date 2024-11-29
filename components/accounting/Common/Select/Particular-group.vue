<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { particularGroupsEnum } = storeToRefs(enums)
onMounted(() => {
    if (!particularGroupsEnum.value.isLoaded) {
        enums.searchParticularGroups()
    }
})
const particularGroupInfo = defineModel("particularGroupInfo", { required: false, type: Object, default: {} })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(particularGroupInfo, (newValue) => {
    particularGroupInfo.value = newValue
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="particularGroupInfo"
            v-model:search-input="particularGroupsEnum.params.key"
            :loading="particularGroupsEnum.isLoading"
            :search-list="particularGroupsEnum.list"
            title="name"
            placeholder="Search Particular Group"
        />
    </div>
</template>
