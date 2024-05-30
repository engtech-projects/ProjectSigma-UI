<script lang="ts" setup>

definePageMeta({
    layout: "default",
})
useHead({
    title: "Transaction",
})
</script>

<template>
    <div class="flex flex gap-4">
        <!-- <div class="flex-1">
            <AccountingTransactionEditTransactionType v-if="transactionTypeStore.isEdit" class="flex-1" />
            <AccountingTransactionNewTransactionType v-else class="flex-1" />
        </div> -->
        <AccountingTransactionList class="flex-2" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
