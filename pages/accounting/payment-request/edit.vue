<template>
    <div class="px-16 bg-white shadow">
        <AccountingPaymentrequestEdit />
    </div>
</template>

<script lang="ts" setup>
import { useStakeHolderStore } from "~/stores/accounting/setup/stakeholder"
import { usePaymentRequestStore } from "~/stores/accounting/requests/paymentrequest"

const paymentRequestStore = usePaymentRequestStore()
if (!useRoute().query.id) {
    navigateTo("/accounting/payment-request")
} else {
    await paymentRequestStore.getPaymentRequest(useRoute().query.id)
}

const stakeholderStore = useStakeHolderStore()
stakeholderStore.getStakeholders()

</script>

<style>

</style>
