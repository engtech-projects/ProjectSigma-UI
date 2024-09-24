<script lang="ts" setup>
import { useStakeholderGroupStore } from "~/stores/accounting/stakeholdergroup"
const stakeholderGroupStore = useStakeholderGroupStore()
definePageMeta({
    layout: "default",
})
useHead({
    title: "Edit Stakeholder Group",
})
if (!useRoute().query.id) {
    navigateTo("/accounting/stakeholder-group")
} else {
    await stakeholderGroupStore.getStakeholderGroup(useRoute().query.id)
}
// const route = useRoute()
</script>
<template>
    <div class="flex justify-center min-h-full">
        <AccountingStakeholdergroupEdit class="flex-1 max-w-[1000px]" />
    </div>
</template>

<style scoped>
    .flex-2 {
        flex: 2;
    }
</style>
