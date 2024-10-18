<template>
    <div class="bg-gray-50">
        <AccountingVoucherDisbursementList />
    </div>
</template>

<script lang="ts" setup>

import { useVoucherStore } from "~/stores/accounting/voucher"

const voucherStore = useVoucherStore()
voucherStore.getVouchers()

</script>
