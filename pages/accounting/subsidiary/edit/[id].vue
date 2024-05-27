<script lang="ts" setup>
definePageMeta({
    layout: "default",
})
useHead({
    title: "Edit Subsidiary Account",
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex">
            <AccountingSubsidiaryEdit class="flex-2" />
        </div>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
