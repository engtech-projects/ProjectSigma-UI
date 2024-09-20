<script setup lang="ts">
useHead({
    title: "Salary Disbursement",
})
const compId = useId()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_salarydisbursement_group,
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salarydisbursement_form,
                        ])"
                        :target-id="compId + '1'"
                        title="Generate Salary Disbursement Request"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salarydisbursement_allrequests,
                        ])"
                        :target-id="compId + '2'"
                        title="All Request"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salarydisbursement_form,
                        ])"
                        :target-id="compId + '3'"
                        title="My Request"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salarydisbursement_myapprovals,
                        ])"
                        :target-id="compId + '4'"
                        title="My Approvals"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salarydisbursement_viewpayslips,
                        ])"
                        :target-id="compId + '5'"
                        title="Release Payslips"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer
                        :id="compId + '1'"
                    >
                        <HrmsPayrollSalaryDisbursementRequestForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        :id="compId + '2'"
                    >
                        PLACEHOLDER
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        :id="compId + '3'"
                    >
                        PLACEHOLDER
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        :id="compId + '4'"
                    >
                        PLACEHOLDER
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        :id="compId + '5'"
                    >
                        PLACEHOLDER
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
