<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()
const model = defineModel({ required: false, type: Number, default: null })
const { searchSupplier } = storeToRefs(enums)

const emit = defineEmits(["supplierSelected"])

onMounted(() => {
    if (!searchSupplier.value.isLoaded) {
        enums.getSupplierSearch()
    }
})

watch(model, (newValue) => {
    emit("supplierSelected", newValue)
})
</script>
<template>
    <div>
        <LayoutFormPsSelectSearch
            v-model:result="model"
            v-model:search-input="searchSupplier.params.search_key"
            :search-list="searchSupplier.list"
            :loading="searchSupplier.isLoading"
            title="supplier_details"
            placeholder="Search Supplier"
        />
    </div>
</template>
