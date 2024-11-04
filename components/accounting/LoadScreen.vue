<template>
    <div v-if="props.isLoading" class="absolute bg-slate-200/50 rounded-lg w-full h-full left-0 top-0 flex items-center justify-center">
        <img
            class="flex justify-center w-28 rounded-md"
            src="/loader.gif"
            alt="logo"
        >
    </div>
</template>

<script setup>
const props = defineProps({
    isLoading: {
        type: Boolean,
        default: false
    },
})
</script>
