<script setup>
import { storeToRefs } from "pinia"
import { useBookStore } from "@/stores/accounting/setup/book"
import { useAccountGroupStore } from "@/stores/accounting/setup/accountgroups"

const bookStore = useBookStore()
const acountGroupStore = useAccountGroupStore()
acountGroupStore.getAccountGroups()
const { isEdit } = storeToRefs(bookStore)
bookStore.getBooks()

useHead({
    title: "Accounting Books",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_BOOK_OF_ACCOUNTS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupBookNewBook
                v-show="!isEdit"
                class="flex-1"
            />
            <LazyAccountingSetupBookEditBook v-show="isEdit" />
            <AccountingSetupBookList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
