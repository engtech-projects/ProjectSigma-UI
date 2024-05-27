<script lang="ts" setup>
definePageMeta({
    layout: "default",
})
useHead({
    title: "New Subsidiary Account",
})
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex">
            <!-- <div class="flex-1">
                <AccountingBookEditBook v-if="bookStore.isEdit" />
                <AccountingBookNewBook v-else />
            </div> -->
            <AccountingSubsidiaryCreate class="flex-2" />
        </div>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
