<script lang="ts" setup>
import { useJournalStore } from "~/stores/accounting/journal"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"
const journalStore = useJournalStore()
await journalStore.baseData()
const accountGroupStore = useAccountGroupStore()
await accountGroupStore.getAccountGroups()
useHead({
    title: "New Entry",
})
</script>
<template>
    <div class="flex justify-center min-h-full">
        <AccountingJournalentryCreate class="flex-1 w-full" />
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
