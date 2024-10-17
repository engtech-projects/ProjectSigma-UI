<template>
    <div class="px-16 bg-white shadow">
        <AccountingVoucherCashDetails />
    </div>
</template>

<script lang="ts" setup>

import { useAccountStore } from "~/stores/accounting/account"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const accountStore = useAccountStore()
accountStore.getAccounts()

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

const bookStore = useBookStore()
await bookStore.getBooks()

const accountGroup = useAccountGroupStore()
await accountGroup.showAccountGroup(bookStore.disbursement.id)

</script>
