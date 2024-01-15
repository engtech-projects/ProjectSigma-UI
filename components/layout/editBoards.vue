<template>
    <div
        class=" bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700 border-t-8 border-t-green-400"
    >
        <h5 class="text-xl font-medium text-gray-900 dark:text-white border-b">
            {{ data.title }}
        </h5>
        <div class="overflow-auto h-96">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const data = defineProps(["title"])
</script>
