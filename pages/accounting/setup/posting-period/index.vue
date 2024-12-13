<script setup>
import { usePostingPeriodStore } from "@/stores/accounting/setup/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
postingPeriodStore.getPostingPeriods()

useHead({
    title: "Posting Period",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_POSTING_PERIODS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupPostingperiodList class="flex-1" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
