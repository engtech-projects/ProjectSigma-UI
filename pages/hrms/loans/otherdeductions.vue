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
            AccessibilityTypes.HRMS_LOANSANDADVANCES_OTHERDEDUCTIONS_GROUP,
        ])"
    >
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.HRMS_LOANSANDADVANCES_OTHERDEDUCTIONS_FORMS,
                    ])"
                    :target-id="'tab0'+compID"
                    title="Other Deductions Request Form"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.HRMS_LOANSANDADVANCES_OTHERDEDUCTIONS_ALL,
                    ])"
                    :target-id="'tab1'+compID"
                    title="All Other Deductions"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.HRMS_LOANSANDADVANCES_OTHERDEDUCTIONS_ONGOING,
                    ])"
                    :target-id="'tab2'+compID"
                    title="Ongoing Other Deductions"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.HRMS_LOANSANDADVANCES_OTHERDEDUCTIONS_PAID,
                    ])"
                    :target-id="'tab3'+compID"
                    title="Paid Other Deductions"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.HRMS_LOANSANDADVANCES_OTHERDEDUCTIONS_PAYMENTS,
                    ])"
                    :target-id="'tab4'+compID"
                    title="Other Deductions Payments"
                />
            </template>
            <template #tab-containers>
                <HrmsCommonTabsTabContainer :id="'tab0'+compID">
                    <HrmsDeductionsForm />
                </HrmsCommonTabsTabContainer>
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
    </LayoutAcessContainer>
</template>
