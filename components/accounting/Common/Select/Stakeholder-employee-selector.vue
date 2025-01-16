<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { employeeEnum } = storeToRefs(enums)
const props = defineProps({
    stakeholderId: { type: Boolean, default: true },
    selectType: { type: String, default: "" },
})
const employeeInfo = defineModel("employeeInfo", { required: false, type: Object, default: {} })

watch(employeeInfo, (newValue) => {
    employeeInfo.value = newValue
})
watch(() => props.selectType, (newValue) => {
    if (!employeeEnum.value.isLoaded && newValue === "employee") {
        enums.getEmployeeEnums()
    }
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="employeeInfo"
            v-model:search-input="employeeEnum.params.key"
            :loading="employeeEnum.isLoading"
            :search-list="employeeEnum.list"
            title="name"
            placeholder="Search Employee"
        />
    </div>
</template>
