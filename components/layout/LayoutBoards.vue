<template>
    <div class="relative LayoutBoards">
        <div v-if="loading" class="absolute bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div
            class="h-full w-full bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-2 dark:bg-gray-800 dark:border-gray-700"
        >
            <div class="flex items-center justify-between border-b mb-2">
                <h5 v-if="title" class="text-xl font-medium text-gray-900 dark:text-white p-2">
                    {{ title }}
                </h5>
                <slot name="header-options" />
            </div>
            <div class="h-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: false,
        default: "",
    },
    loading: {
        type: Boolean,
        default: false,
    }
})
</script>
