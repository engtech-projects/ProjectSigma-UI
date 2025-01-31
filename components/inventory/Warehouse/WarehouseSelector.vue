<script setup lang="ts">
import { useWarehouseStore } from "@/stores/inventory/warehouse"
const warehouseStore = useWarehouseStore()
const { warehouse } = storeToRefs(warehouseStore)
onMounted(() => {
    if (!warehouse.value.isLoaded) {
        warehouseStore.fetchWarehouse()
    }
})
const model = defineModel({ required: false, type: Number, default: null })
defineProps({
    showAll: { type: Boolean, default: false },
    useHrmsId: { type: Boolean, default: true },
})
const testData = ref({})

</script>
<template>
    <LayoutFormPsSelectSearch
        v-model:result="testData"
        v-model:result-id="model"
        v-model:search-input="warehouse.localFilter.name"
        :search-list="warehouseStore.filteredwarehouseList"
        :loading="warehouse.isLoading"
        title="name"
        placeholder="Search Warehouse"
    />
</template>
