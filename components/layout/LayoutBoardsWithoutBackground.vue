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
            class="h-full w-full rounded-lg sm:p-6 md:p-2"
        >
            <h5 v-if="title" class="text-lg border-b mb-4 font-medium text-gray-900">
                {{ title }}
            </h5>
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
