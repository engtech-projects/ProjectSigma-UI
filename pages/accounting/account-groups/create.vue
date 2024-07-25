<script lang="ts" setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "New Account Group",
})
navigateTo("/accounting/account-groups")
</script>

<template>
    <div class="flex justify-center min-h-full">
        <AccountingAccountGroupNew class="flex-1" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
