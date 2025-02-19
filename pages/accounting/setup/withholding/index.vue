<script setup>
import { useAccountStore } from "@/stores/accounting/setup/account"
import { useWithholdingTaxStore } from "@/stores/accounting/setup/withholdingtax"

const accountStore = useAccountStore()
const withholdingTaxStore = useWithholdingTaxStore()
withholdingTaxStore.getWithholdingTaxes()
accountStore.getAccounts()

useHead({
    title: "Withholding Tax",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_ACCOUNTS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupWithholdingCreate
                v-show="!withholdingTaxStore.isEdit"
                class="flex-1"
            />
            <AccountingSetupWithholdingEdit v-show="withholdingTaxStore.isEdit" class="flex-1" />
            <AccountingSetupWithholdingList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>
<style scoped>
.flex-2 {
    flex: 2;
}
</style>
