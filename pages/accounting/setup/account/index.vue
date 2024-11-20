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
                class="flex-1"
            />
            <AccountingSetupAccountEdit v-show="isEdit" class="flex-1" />
            <AccountingSetupAccountList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>
<style scoped>
.flex-2 {
    flex: 2;
}
</style>
