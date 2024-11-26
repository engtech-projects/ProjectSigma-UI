<script setup>
import { storeToRefs } from "pinia"
import { useAccountGroupStore } from "@/stores/accounting/setup/accountgroups"

const accountGroup = useAccountGroupStore()
accountGroup.getAccountGroups()
const { isEdit } = storeToRefs(accountGroup)

useHead({
    title: "Account Group",
})

</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.ACCOUNTING_SETUP_ACCOUNT_GROUPS,
        ])"
    >
        <div class="flex flex-col md:flex-row gap-4">
            <AccountingSetupAccountGroupNew
                v-show="!isEdit"
                class="flex-1"
            />
            <AccountingSetupAccountGroupEdit v-show="isEdit" class="flex-1" />
            <AccountingSetupAccountGroupList class="flex-2" />
        </div>
    </LayoutAcessContainer>
</template>
<style scoped>
.flex-2 {
    flex: 2;
}
</style>
