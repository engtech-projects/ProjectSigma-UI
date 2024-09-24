<script lang="ts" setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "Books",
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex">
            <AccountingAccountGroupList class="flex-1" />
        </div>
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
