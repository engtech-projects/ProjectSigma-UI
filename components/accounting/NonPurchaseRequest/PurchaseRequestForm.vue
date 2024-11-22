<script setup>
defineProps({
    fillable: {
        type: Boolean,
        required: false,
        default: false
    },
    paymentData: {
        type: Object,
        required: false,
        default: null
    }
})
</script>

<template>
    <div v-show="fillable">
        <AccountingNonPurchaseRequestCreateForm />
    </div>
    <div v-show="!fillable">
        <AccountingNonPurchaseRequestViewForm :payment-data="paymentData" />
    </div>
</template>
