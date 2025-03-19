<template>
    <div class="flex flex-col gap-6 p-2">
        <h1 class="text-lg mb-4 text-center uppercase font-bold">
            Department of Public Works and Highways
        </h1>
        <div class="flex flex-col gap-4">
            <div class="flex items-end gap-1 mb-8">
                <h1 class="text-2xl text-black uppercase font-semibold">
                    Project Details
                </h1>
                <h4 class="text-gray-500 text-md">
                    Project Description
                </h4>
            </div>
            <div class="flex flex-col gap-3 mb-8">
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Project Id:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        PRJ-10001-8977657-B1139876
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Contract Name:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        Construction of Flood Control Structure along Tago River, Abutment A, San Miguel Surigao del Sur
                    </span>
                </div>
                <div class="flex items-end gap-3">
                    <span class=" text-gray-500 uppercase w-[140px] text-right">
                        Location:
                    </span>
                    <span class="text-black text-md uppercase flex-1 font-semibold">
                        San Miguel, Surigao del Sur
                    </span>
                </div>
            </div>

            <h1 class="text-2xl text-black uppercase font-semibold">
                Detailed Unit Price Analysis
            </h1>
        </div>

        <AccountingCommonTabsMainContainer class="w-full">
            <template #tab-titles>
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="BILL OF QUANTITIES"
                    target-id="billOfQuantities"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="SUMMARY OF RATES"
                    target-id="summaryRates"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="BID OF SUMMARY"
                    target-id="bidSummary"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="CASH FLOW"
                    target-id="cashFlow"
                />
                <AccountingCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.ACCOUNTING_VOUCHER_DISBURSEMENT_MY_APPROVAL,
                    ])"
                    title="PROJECT ASSIGNMENT"
                    target-id="projectAssignment"
                />
            </template>
            <template #tab-containers>
                <AccountingCommonTabsTabContainer id="billOfQuantities">
                    <ProjectsBillofQuantities />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="summaryRates">
                    <ProjectsSummaryRates />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="bidSummary">
                    <ProjectsBidSummary />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="cashFlow">
                    <ProjectsCashFlow />
                </AccountingCommonTabsTabContainer>
                <AccountingCommonTabsTabContainer id="projectAssignment">
                    <ProjectsProjectAssignment />
                </AccountingCommonTabsTabContainer>
            </template>
        </AccountingCommonTabsMainContainer>
    </div>
</template>

<script lang="ts" setup>
</script>

<style>
#tabContainer span.active {
    border-bottom-color: rgb(28 100 242);
    color: rgb(28 100 242);
}
</style>
