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
    loading: {
        type: Boolean,
        required: true
    }
})

const selectedItems = defineModel("selectedItems", { default: () => ({}) })
const activeSupplier = defineModel("activeSupplier", { default: null })
</script>

<template>
    <div class="flex w-full">
        <div v-if="loading" class="absolute inset-0 z-0 flex items-center justify-center bg-slate-200/50">
            <img class="w-16" src="/loader.gif" alt="Loading...">
        </div>
        <InventoryCanvassSummaryRequestedItems
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
            class="w-1/2"
        />
        <InventoryCanvassSummarySupplierQuotes
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
            class="w-1/2"
        />
    </div>
</template>
