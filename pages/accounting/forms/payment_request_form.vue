<template>
    <div class="px-16 bg-white shadow">
        <AccountingFormsPaymentRequest />
    </div>
</template>

<script lang="ts" setup>
import { useStakeholderStore } from "~/stores/accounting/stakeholder"

const stakeholderStore = useStakeholderStore()
stakeholderStore.getStakeholders()

</script>

<style>

</style>
