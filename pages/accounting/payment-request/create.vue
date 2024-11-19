<template>
    <div class="px-16 bg-white shadow">
        <AccountingPaymentrequestCreate />
    </div>
</template>

<script lang="ts" setup>
import { useStakeHolderStore } from "~/stores/accounting/stakeholders/stakeholder"

const stakeholderStore = useStakeHolderStore()
stakeholderStore.getStakeholders()

</script>

<style>

</style>
