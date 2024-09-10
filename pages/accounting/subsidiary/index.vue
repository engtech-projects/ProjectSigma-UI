<script lang="ts" setup>
import { useBookStore } from "~/stores/accounting/book"

const bookStore = useBookStore()
await bookStore.getBooks()

definePageMeta({
    layout: "default",
})
useHead({
    title: "Books",
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <div class="flex">
            <!-- <div class="flex-1">
                <AccountingBookEditBook v-if="bookStore.isEdit" />
                <AccountingBookNewBook v-else />
            </div> -->
            <AccountingSubsidiaryList class="flex-2" />
        </div>
    </div>
</template>

<style>
    .flex-2 {
        flex: 2;
    }
</style>
