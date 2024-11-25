<script setup>
import { storeToRefs } from "pinia"
import { usePostingPeriodStore } from "@/stores/accounting/setup/postingperiod"

const postingPeriodStore = usePostingPeriodStore()
postingPeriodStore.getPostingPeriods()
const { isEdit } = storeToRefs(postingPeriodStore)

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
            <AccountingSetupPostingperiodCreate
                v-show="!isEdit"
                class="flex-1"
            />
            <AccountingSetupPostingperiodEdit v-show="isEdit" class="flex-1" />
            <AccountingSetupPostingperiodList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
