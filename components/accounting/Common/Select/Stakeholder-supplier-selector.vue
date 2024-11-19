<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { supplierEnum } = storeToRefs(enums)
onMounted(() => {
    if (!supplierEnum.value.isLoaded) {
        enums.getSupplierEnums()
    }
})
const supplierInfo = defineModel("supplierInfo", { required: false, type: Object, default: {} })
defineProps({
    stakeholderId: { type: Boolean, default: true },
})
watch(supplierInfo, (newValue) => {
    supplierInfo.value = newValue
})
</script>
<template>
    <div class="relative">
        <LayoutFormPsSelectSearch
            v-model:result="supplierInfo"
            v-model:search-input="supplierEnum.params.key"
            :loading="supplierEnum.isLoading"
            :search-list="supplierEnum.list"
            title="name"
            placeholder="Search Supplier"
        />
    </div>
</template>
