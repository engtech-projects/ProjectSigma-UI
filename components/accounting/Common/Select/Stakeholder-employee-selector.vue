<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { employeeEnum } = storeToRefs(enums)
onMounted(() => {
    if (!employeeEnum.value.isLoaded) {
        enums.getEmployeeEnums()
    }
})
const employeeInfo = defineModel("employeeInfo", { required: false, type: Object, default: {} })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(employeeInfo, (newValue) => {
    employeeInfo.value = newValue
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
