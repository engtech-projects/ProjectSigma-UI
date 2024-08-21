<script setup>
defineProps({
    avatar: {
        type: String,
        required: false,
        default: "/avatarexample.png",
    }
})
</script>
<template>
    <div class="rounded max-w-28 max-h-28">
        <img class="m-auto h-full" :src="avatar" alt="Avatar">
    </div>
</template>
