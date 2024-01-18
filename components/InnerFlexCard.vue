<script setup>
defineProps({
    headerTitle: {
        type: String,
        required: false,
        default: "",
    },
    headerIcon: {
        type: String,
        required: false,
        default: "",
    },
})
</script>
<template>
    <div class="grow flex flex-col p-3 space-y-4 shadow-md rounded-lg border-t-4 border-teal-400">
        <span class="text-sm lg:text-base font-bold">{{ headerTitle }}</span>
        <hr class="h-px border-0 bg-slate-300">
        <slot />
    </div>
</template>
