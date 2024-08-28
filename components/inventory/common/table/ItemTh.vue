<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    }
})
</script>
<template>
    <th scope="col" class="p-2 border-0 border-b text-sm">
        {{ title }}
    </th>
</template>
