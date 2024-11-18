<script setup>
import { storeToRefs } from "pinia"
import { useAccountTypeStore } from "@/stores/accounting/setup/accounttype"

const accountTypeStore = useAccountTypeStore()
const { isEdit } = storeToRefs(accountTypeStore)
accountTypeStore.getAccountTypes()
accountTypeStore.getAccountCategories()

useHead({
    title: "Account Type",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_ACCOUNT_TYPES,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupAccounttypeCreate
                v-show="!isEdit"
            />
            <AccountingSetupAccounttypeEdit v-show="isEdit" />
            <AccountingSetupAccounttypeList />
        </div>
    </LayoutAcessContainer>
</template>
