<template>
    <div class="px-16 bg-white shadow">
        <AccountingFormsDisbursementVoucher />
    </div>
</template>

<script lang="ts" setup>

import { useAccountStore } from "~/stores/accounting/setup/account"
import { useStakeHolderStore } from "~/stores/accounting/setup/stakeholder"

const accountStore = useAccountStore()
accountStore.getAccounts()

const stakeholderStore = useStakeHolderStore()
stakeholderStore.getStakeholders()

</script>
