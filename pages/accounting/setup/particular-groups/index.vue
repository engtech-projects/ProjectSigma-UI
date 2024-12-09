<script setup>
import { storeToRefs } from "pinia"
import { useParticularGroupStore } from "@/stores/accounting/setup/particulargroup"

const particularGroupStore = useParticularGroupStore()
const { isEdit } = storeToRefs(particularGroupStore)
particularGroupStore.getParticularGroups()

useHead({
    title: "Particular Groups",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_PARTICULAR_GROUP,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupParticulargroupCreate
                v-show="!isEdit"
                class="flex-1"
            />
            <AccountingSetupParticulargroupEdit v-show="isEdit" class="flex-1" />
            <AccountingSetupParticulargroupList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
