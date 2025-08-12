<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    },
    suppliers: {
        type: Array,
        required: true
    },
})
const selectedItems = defineModel("selectedItems", { default: () => ({}) })
const activeSupplier = defineModel("activeSupplier", { default: null })
</script>

<template>
    <div class="flex">
        <InventoryCanvassSummaryRequestedItems
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
            class="w-2/5"
        />
        <InventoryCanvassSummarySupplierQuotes
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
            class="w-3/5"
        />
    </div>
</template>
