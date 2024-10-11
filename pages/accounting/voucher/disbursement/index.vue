<template>
    <div class="px-16 bg-white shadow">
        <AccountingVoucherDisbursementList />
    </div>
</template>

<script lang="ts" setup>

import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()
voucherStore.getVouchers()

</script>
