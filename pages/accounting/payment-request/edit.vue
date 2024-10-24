<template>
    <div class="px-16 bg-white shadow">
        <AccountingPaymentrequestEdit />
    </div>
</template>

<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
if (!useRoute().query.id) {
    navigateTo("/accounting/payment-request")
} else {
    await paymentRequestStore.getPaymentRequest(useRoute().query.id)
}

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

</script>

<style>

</style>
