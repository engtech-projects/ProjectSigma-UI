<script setup lang="ts">
const compID = useId()
useHead({
    title: "Other Deductions",
    meta: [
        { name: "description", content: "" }
    ],

})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_loans_and_advances_other_deductions,
        ])"
    >
        <div class="grid grid-cols-1 gap-2">
            <HrmsLoansDeductionsForm />
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_loans_and_advances_other_deductions,
                        ])"
                        :target-id="'tab1'+compID"
                        title="All Other Deductions"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_loans_and_advances_other_deductions,
                        ])"
                        :target-id="'tab2'+compID"
                        title="Ongoing Other Deductions"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_loans_and_advances_other_deductions,
                        ])"
                        :target-id="'tab3'+compID"
                        title="Paid Other Deductions"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_loans_and_advances_other_deductions,
                        ])"
                        :target-id="'tab4'+compID"
                        title="Other Deductions Payments"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer :id="'tab1'+compID">
                        <HrmsLoansDeductionsTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab2'+compID">
                        <HrmsLoansDeductionsOngoingTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab3'+compID">
                        <HrmsLoansDeductionsPaidTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab4'+compID">
                        <HrmsLoansDeductionsPaymentsTable />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
