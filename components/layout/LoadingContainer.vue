<template>
    <div class="relative LoadingContainer">
        <div v-show="loading" class="absolute z-10 bg-slate-200/50 rounded-lg w-full h-full flex items-center justify-center">
            <img
                class="flex justify-center w-28 rounded-md"
                src="/loader.gif"
                alt="logo"
            >
        </div>
        <div class="h-full w-full">
            <div class="h-full">
                <slot />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    loading: {
        type: Boolean,
        default: false,
    }
})
</script>
