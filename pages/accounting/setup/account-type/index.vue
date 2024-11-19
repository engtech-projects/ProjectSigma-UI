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
                class="w-1/3"
            />
            <AccountingSetupAccounttypeEdit v-show="isEdit" />
            <AccountingSetupAccounttypeList class="flex-1" />
        </div>
    </LayoutAcessContainer>
</template>
