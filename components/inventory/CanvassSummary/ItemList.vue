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
        <!-- <div v-if="loading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-sm text-white">
            <div class="flex items-center space-x-4 animate-pulse">
                <img class="w-12 h-12" src="/loader.gif" alt="Loading...">
                <span class="text-lg font-semibold tracking-wide">Loading resources...</span>
            </div>
            <div class="mt-4 w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 animate-loading-bar" />
            </div>
        </div> -->
        <div v-if="loading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900/60 backdrop-blur-sm rounded-lg animate-loading">
            <img class="w-16" src="/loader.gif" alt="Loading...">
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

<style>
@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-loading {
  animation: loading 1.5s infinite linear;
}
</style>
