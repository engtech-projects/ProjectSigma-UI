<script lang="ts" setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "New Account Group",
})
// const route = useRoute()
</script>

<template>
    <div class="flex justify-center min-h-full">
        <AccountingAccountGroupEdit class="flex-1 max-w-[1000px]" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
