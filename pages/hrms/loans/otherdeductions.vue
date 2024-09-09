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
            <HrmsDeductionsForm />
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
                        <HrmsDeductionsTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab2'+compID">
                        <HrmsDeductionsOngoingTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab3'+compID">
                        <HrmsDeductionsPaidTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab4'+compID">
                        <HrmsDeductionsPaymentsTable />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
