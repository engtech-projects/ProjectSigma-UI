<script lang="ts" setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "New Stakeholder Group",
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex">
            <AccountingStakeholdergroupCreate class="flex-2" />
        </div>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
