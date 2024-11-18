<script lang="ts" setup>
import { useBookStore } from "~/stores/accounting/setup/book"
const bookStore = useBookStore()

definePageMeta({
    layout: "default",
})
useHead({
    title: "Edit Book",
})
if (!useRoute().query.id) {
    navigateTo("/accounting/books")
} else {
    await bookStore.getBook(useRoute().query.id)
}
navigateTo("/accounting/books")
</script>
<template>
    <div class="flex justify-center min-h-full">
        <AccountingBookEditBook class="flex-1 max-w-[1000px]" />
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
