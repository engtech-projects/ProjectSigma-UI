<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { useInventoryEnumsStore } from "@/stores/inventory/enum"

const enums = useInventoryEnumsStore()
const model = defineModel({ required: false, type: Number, default: null })
const { searchSupplier } = storeToRefs(enums)
const snackbar = useSnackbar()
const emit = defineEmits(["supplierSelected"])
const resultObject = ref({})
onMounted(() => {
    try {
        if (!searchSupplier.value.isLoaded) {
            enums.getSupplierSearch()
        }
    } catch (error) {
        snackbar.show("Failed to load Supplier Search", "error")
    }
})

watch(model, (newValue) => {
    emit("supplierSelected", newValue)
})
</script>
<template>
    <div>
        <LayoutFormPsSelectSearch
            v-model:result="resultObject"
            v-model:result-id="model"
            v-model:search-input="searchSupplier.params.search_key"
            :search-list="searchSupplier.list"
            :loading="searchSupplier.isLoading"
            title="supplier_details"
            placeholder="Search Supplier"
        />
    </div>
</template>
