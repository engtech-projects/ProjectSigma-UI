<script setup lang="ts">
import { useAccountingEnumStore } from "~/stores/accounting/enums/enum"
const enums = useAccountingEnumStore()
const { supplierEnum } = storeToRefs(enums)
const props = defineProps({
    stakeholderId: { type: Boolean, default: true },
    selectType: { type: String, default: "" },
})
const supplierInfo = defineModel("supplierInfo", { required: false, type: Object, default: {} })

watch(supplierInfo, (newValue) => {
    supplierInfo.value = newValue
})
watch(() => props.selectType, (newValue) => {
    if (!supplierEnum.value.isLoaded && newValue === "supplier") {
        enums.getSupplierEnums()
    }
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
