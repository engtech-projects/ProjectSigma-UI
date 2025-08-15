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
    },
    readOnly: {
        type: Boolean,
        required: true
    }
})

const selectedItems = defineModel("selectedItems", { default: () => ({}) })
const activeSupplier = defineModel("activeSupplier", { default: null })
</script>

<template>
    <div class="flex w-full">
        <div v-if="loading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-200/60 backdrop-blur-sm rounded-lg animate-loading">
            <img class="w-18 h-18" src="/loader.gif" alt="Loading...">
        </div>

        <InventoryCanvassSummaryRequestedItems
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
            class="w-1/2"
            :read-only="readOnly"
        />
        <InventoryCanvassSummarySupplierQuotes
            v-model:selected-items="selectedItems"
            v-model:active-supplier="activeSupplier"
            :items="items"
            :suppliers="suppliers"
            class="w-1/2"
            :read-only="readOnly"
        />
    </div>
</template>
