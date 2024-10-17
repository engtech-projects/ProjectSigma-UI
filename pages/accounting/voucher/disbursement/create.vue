<template>
    <div class="px-16 bg-white shadow">
        <AccountingVoucherDisbursementCreate />
    </div>
</template>

<script lang="ts" setup>

import { useVoucherStore } from "~/stores/accounting/voucher"
import { useAccountStore } from "~/stores/accounting/account"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { useBookStore } from "~/stores/accounting/book"
import { useAccountGroupStore } from "~/stores/accounting/accountgroups"

const voucherStore = useVoucherStore()
voucherStore.reset()
await voucherStore.generateVoucherNumber("DV")

const accountStore = useAccountStore()
accountStore.getAccounts()

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

const bookStore = useBookStore()
await bookStore.getBooks()

const accountGroup = useAccountGroupStore()
await accountGroup.showAccountGroup(bookStore.disbursement.id)

</script>
