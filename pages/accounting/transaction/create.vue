<script lang="ts" setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "New Transaction",
})
</script>
<template>
    <div class="flex justify-center min-h-full">
        <AccountingTransactionCreate class="flex-1 w-full" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
