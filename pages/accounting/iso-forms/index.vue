<template>
    <div class="flex flex-col gap-4 min-h-screen">
        <div class="flex gap-4 items-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">
                ISO Forms
            </h1>
            <select id="accountType" v-model="reportType" class="rounded-lg w-1/4" required>
                <option v-for="report in reports" :key="report.value" :value="report.value">
                    {{ report.name }}
                </option>
            </select>
        </div>
        <LayoutPrint v-if="reportType">
            <component :is="reportComponent" />
        </LayoutPrint>
    </div>
</template>

<script lang="ts" setup>
import AccountingIsoformsLiquidationForm from "~/components/accounting/isoforms/LiquidationForm.vue"
import AccountingIsoformsReplenishmentSummary from "~/components/accounting/isoforms/ReplenishmentSummary.vue"

const reportType = ref(null)
const reports = ref([
    {
        name: "Liquidation Form",
        value: "liquidation-form",
        component: AccountingIsoformsLiquidationForm,
    },
    {
        name: "Replenishment Summary",
        value: "replenishment-summary",
        component: AccountingIsoformsReplenishmentSummary,
    },
])
const reportComponent = computed(() => {
    return reports.value.find(report => report.value === reportType.value)?.component
})
</script>

<style>

</style>
