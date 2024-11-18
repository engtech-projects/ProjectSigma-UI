<script lang="ts" setup>
import { useAccountGroupStore } from "~/stores/accounting/setup/accountgroups"
const accountGroupStore = useAccountGroupStore()

definePageMeta({
    layout: "default",
})
useHead({
    title: "New Book",
})
if (!useRoute().query.id) {
    navigateTo("/accounting/account-groups")
} else {
    await accountGroupStore.showAccountGroup(useRoute().query.id)
}
</script>
<template>
    <div class="flex justify-center min-h-full">
        <AccountingAccountGroupEdit class="flex-1" />
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
