<template>
    <div class="px-16 bg-white shadow">
        <AccountingFormsDisbursementVoucher />
    </div>
</template>

<script lang="ts" setup>

import { useAccountStore } from "~/stores/accounting/account"
const accountStore = useAccountStore()
accountStore.getAccounts()

</script>
