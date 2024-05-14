<script setup>
defineProps({
    id: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <div :id="id" class="hidden bg-teal-50 p-1 dark:bg-gray-800" role="tabpanel" :aria-labelledby="id">
        <slot />
    </div>
</template>
