<template>
    <div class="bg-gray-50">
        <AccountingPaymentrequestList />
    </div>
</template>

<script lang="ts" setup>

import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
paymentRequestStore.getPaymentRequests()

</script>
