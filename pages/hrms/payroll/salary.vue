<script setup lang="ts">
useHead({
    title: "Salary",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_salary_group,
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_form,
                        ])"
                        target-id="payrollForm"
                        title="Generate Payroll"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_allrequests,
                        ])"
                        target-id="allRequest"
                        title="All Request"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_form,
                        ])"
                        target-id="myRequestList"
                        title="My Request"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_myapprovals,
                        ])"
                        target-id="myApprovalsList"
                        title="My Approvals"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_payrollrecord,
                        ])"
                        target-id="payrollRecord"
                        title="Payroll Record"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            'AdminOnly',
                        ])"
                        target-id="generatePayslip"
                        title="Generate Payroll Disbursement"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer
                        id="payrollForm"
                    >
                        <HrmsPayrollSalaryGeneratePayrollGenerateForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="allRequest"
                    >
                        <HrmsPayrollSalaryGeneratePayrollAllRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="myRequestList"
                    >
                        <HrmsPayrollSalaryGeneratePayrollMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="myApprovalsList"
                    >
                        <HrmsPayrollSalaryGeneratePayrollMyApprovals />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="payrollRecord"
                    >
                        <HrmsPayrollSalaryPayrollRecords />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        id="generatePayslip"
                    >
                        <HrmsPayrollGeneratePayslip />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
