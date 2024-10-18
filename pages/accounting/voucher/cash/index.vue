<template>
    <div class="bg-gray-50">
        <AccountingVoucherCashList />
    </div>
</template>

<script lang="ts" setup>

import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()
voucherStore.getVouchers()

</script>
