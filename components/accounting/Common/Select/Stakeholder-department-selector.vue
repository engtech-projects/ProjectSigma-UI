<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { departmentEnum } = storeToRefs(enums)
const props = defineProps({
    stakeholderId: { type: Boolean, default: true },
    selectType: { type: String, default: "" },
})
const departmentInfo = defineModel("departmentInfo", { required: false, type: Object, default: {} })

watch(departmentInfo, (newValue) => {
    departmentInfo.value = newValue
})
watch(() => props.selectType, (newValue) => {
    if (!departmentEnum.value.isLoaded && newValue === "department") {
        enums.getDepartmentEnums()
    }
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
