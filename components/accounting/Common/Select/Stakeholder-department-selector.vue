<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { departmentEnum } = storeToRefs(enums)
onMounted(() => {
    if (!departmentEnum.value.isLoaded) {
        enums.getDepartmentEnums()
    }
})
const departmentInfo = defineModel("departmentInfo", { required: false, type: Object, default: {} })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(departmentInfo, (newValue) => {
    departmentInfo.value = newValue
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="departmentInfo"
            v-model:search-input="departmentEnum.params.key"
            :loading="departmentEnum.isLoading"
            :search-list="departmentEnum.list"
            title="name"
            placeholder="Search Department"
        />
    </div>
</template>
