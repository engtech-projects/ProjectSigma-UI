<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useAccountStore } from "~/stores/accounting/account"

const stakeholderStore = useStakeholderStore()
await stakeholderStore.getStakeholders()

const accountStore = useAccountStore()
accountStore.getAccounts()
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
