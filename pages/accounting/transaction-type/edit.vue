<script lang="ts" setup>
import { useTransactionTypeStore } from "~/stores/accounting/transactiontype"
const transactionTypeStore = useTransactionTypeStore()

definePageMeta({
    layout: "default",
})
useHead({
    title: "Edit Document Series",
})
if (!useRoute().query.id) {
    navigateTo("/accounting/books")
} else {
    await transactionTypeStore.getTransactionType(useRoute().query.id)
}
</script>

<template>
    <div class="flex justify-center min-h-full">
        <AccountingTransactionEditTransactionType class="flex-1 max-w-[1000px]" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
