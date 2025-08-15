<script setup lang="ts">
const compID = useId()
useHead({
    title: "Loans",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.HRMS_LOANSANDADVANCES_LOANS_GROUP,
        ])"
    >
        <div class="w-full flex gap-2">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_LOANSANDADVANCES_LOANS_FORMS,
                        ])"
                        :target-id="'tab0'+compID"
                        title="Loans Form"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_LOANSANDADVANCES_LOANS_ALL,
                        ])"
                        :target-id="'tab1'+compID"
                        title="All Loans"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_LOANSANDADVANCES_LOANS_ONGOING,
                        ])"
                        :target-id="'tab2'+compID"
                        title="Ongoing Loans"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_LOANSANDADVANCES_LOANS_PAID,
                        ])"
                        :target-id="'tab3'+compID"
                        title="Paid Loans"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_LOANSANDADVANCES_LOANS_PAYMENTS,
                        ])"
                        :target-id="'tab4'+compID"
                        title="Loan Payments"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer :id="'tab0'+compID">
                        <HrmsLoansForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab1'+compID">
                        <HrmsLoansTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab2'+compID">
                        <HrmsLoansOngoingTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab3'+compID">
                        <HrmsLoansPaidTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab4'+compID">
                        <HrmsLoansPaymentsTable />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
