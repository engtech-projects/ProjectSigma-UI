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
        <AccountingVoucherDisbursementCreateForm />
    </div>
    <div v-show="!fillable">
        <AccountingVoucherDisbursementViewForm :payment-data="paymentData" />
    </div>
</template>
