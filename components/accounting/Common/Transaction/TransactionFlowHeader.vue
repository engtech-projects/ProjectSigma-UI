<script setup>
defineProps({
    title: {
        type: String,
        default: "",
    },
})
</script>
<template>
    <!-- Header -->
    <div class="bg-white text-gray-500 px-2 shadow-lg py-2">
        <div class="flex items-center gap-3">
            <h2 class="text-md font-bold text-center">
                {{ title }}
            </h2>
        </div>
    </div>
</template>
