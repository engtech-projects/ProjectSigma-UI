<script setup>
import { useAccountStore } from "@/stores/accounting/setup/account"
import { useAccountTypeStore } from "@/stores/accounting/setup/accounttype"

const accountStore = useAccountStore()
const accountTypeStore = useAccountTypeStore()
accountTypeStore.getAccountTypes()
accountStore.getChart()

useHead({
    title: "Chart of Accounts",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_ACCOUNT_TYPES,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupChartofaccountsList class="flex-1" />
        </div>
    </LayoutAcessContainer>
</template>
<style scoped>
.flex-2 {
    flex: 2;
}
</style>
