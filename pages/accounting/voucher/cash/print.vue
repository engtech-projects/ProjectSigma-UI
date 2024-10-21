<template>
    <AccountingVoucherCashPrint :id="useRoute().query.id?.toString()" />
</template>

<script lang="ts" setup>
definePageMeta({
    layout: false,
})

if (!useRoute().query.id) {
    navigateTo("/accounting/voucher/cash")
}

</script>
