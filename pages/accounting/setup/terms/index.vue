<script setup>
import { storeToRefs } from "pinia"
import { useTermsStore } from "@/stores/accounting/setup/terms"
import { useAccountStore } from "@/stores/accounting/setup/account"

const termsStore = useTermsStore()
const { isEdit } = storeToRefs(termsStore)
termsStore.getTerms()
termsStore.getBalanceType()

const accountStore = useAccountStore()
accountStore.getAccounts()

useHead({
    title: "Terms",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_TERMS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupTermsCreate
                v-show="!isEdit"
                class="flex-1"
            />
            <AccountingSetupTermsEdit v-show="isEdit" class="flex-1" />
            <AccountingSetupTermsList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>

<style scoped>
    .flex-2 {
        flex: 2
    }
</style>
