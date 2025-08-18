<script setup lang="ts">
useHead({
    title: "Generate Allowance"
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.HRMS_PAYROLL_ALLOWANCE_GROUP,
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_ALLOWANCE_FORMANDMYREQUEST,
                        ])"
                        target-id="generateallowance"
                        title="Generate Allowance"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_ALLOWANCE_ALLOWANCERECORD,
                        ])"
                        target-id="allowance-records"
                        title="Allowance Records"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_ALLOWANCE_ALLREQUESTS,
                        ])"
                        target-id="allRequestsList"
                        title="All Requests"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_ALLOWANCE_FORMANDMYREQUEST,
                        ])"
                        target-id="myRequestList"
                        title="My Requests"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_ALLOWANCE_MYAPPROVALS,
                        ])"
                        target-id="myApprovalsList"
                        title="My Approvals"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="generateallowance">
                        <HrmsPayrollAllowanceForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allowance-records">
                        <HrmsPayrollAllowanceRecords />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allRequestsList">
                        <HrmsPayrollAllowanceAllRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myRequestList">
                        <HrmsPayrollAllowanceMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovalsList">
                        <HrmsPayrollAllowanceMyApprovals />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
