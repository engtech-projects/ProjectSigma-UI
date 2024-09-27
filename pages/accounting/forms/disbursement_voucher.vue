<template>
    <div class="px-16 bg-white shadow">
        <AccountingFormsDisbursementVoucher />
    </div>
</template>

<script lang="ts" setup>

import { useAccountStore } from "~/stores/accounting/account"
import { useStakeholderStore } from "~/stores/accounting/stakeholder"

const accountStore = useAccountStore()
accountStore.getAccounts()

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

</script>
