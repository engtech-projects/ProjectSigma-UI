<script setup>
import { storeToRefs } from "pinia"
import { useStakeHolderStore } from "@/stores/accounting/setup/stakeholder"

const stakeholderStore = useStakeHolderStore()
const { isEdit } = storeToRefs(stakeholderStore)
stakeholderStore.getStakeholders()

useHead({
    title: "Accounting Stakeholder",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_STAKEHOLDERS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupStakeholderCreate
                v-show="!isEdit"
                class="flex-1"
            />
            <AccountingSetupStakeholderEdit v-show="isEdit" class="flex-1" />
            <AccountingSetupStakeholderList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
