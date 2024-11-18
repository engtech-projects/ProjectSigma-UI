<script setup>
defineProps({
    id: {
        type: String,
        required: true,
    },
})
</script>
<template>
    <div :id="id" class="hidden " role="tabpanel" :aria-labelledby="id">
        <slot />
    </div>
</template>
