<template>
    <section class="flex-1 p-4 overflow-y-auto h-screen">
        <slot :name="activeTab" />
        <div v-if="!$slots[activeTab]" class="text-gray-400 italic">
            Select a tab to view content.
        </div>
    </section>
</template>

<script setup>
defineProps({
    activeTab: {
        type: String,
        required: true,
    },
})
</script>
