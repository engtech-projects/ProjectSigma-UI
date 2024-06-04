<script lang="ts" setup>
import { useBookStore } from "~/stores/accounting/book"
const bookStore = useBookStore()

definePageMeta({
    layout: "default",
})
useHead({
    title: "New Book",
})
if (!useRoute().query.id) {
    navigateTo("/accounting/books")
} else {
    await bookStore.getBook(useRoute().query.id)
}
</script>

<template>
    <div class="flex justify-center min-h-full">
        <AccountingBookEditBook class="flex-1 max-w-[1000px]" />
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
