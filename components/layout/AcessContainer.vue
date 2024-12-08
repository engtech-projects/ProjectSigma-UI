<script setup>
defineProps({
    ifAccess: {
        type: Boolean,
        require: true,
    }
})
</script>
<template>
    <div
        v-if="ifAccess"
        class="w-full"
    >
        <slot />
    </div>
    <div v-else>
        <LayoutBackOrHome message="You are not authorized to access this page." />
    </div>
</template>
