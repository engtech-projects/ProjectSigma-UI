<script setup>
import { storeToRefs } from "pinia"
import { useAccountStore } from "@/stores/accounting/setup/account"
import { useAccountTypeStore } from "@/stores/accounting/setup/accounttype"

const accountStore = useAccountStore()
const accountTypeStore = useAccountTypeStore()
accountTypeStore.getAccountTypes()
const { isEdit } = storeToRefs(accountStore)
accountStore.getAccounts()

useHead({
    title: "Account",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_ACCOUNT_TYPES,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupAccountCreate
                v-show="!isEdit"
                class="w-1/3"
            />
            <AccountingSetupAccountEdit v-show="isEdit" />
            <AccountingSetupAccountList class="flex-1" />
        </div>
    </LayoutAcessContainer>
</template>
