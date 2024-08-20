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
                        target-id="payrollForm"
                        title="Generate Payroll"
                    />
                    <HrmsCommonTabsTabTitle
                        target-id="allRequest"
                        title="All Request"
                    />
                    <HrmsCommonTabsTabTitle
                        target-id="myRequestList"
                        title="My Request"
                    />
                    <HrmsCommonTabsTabTitle
                        target-id="myApprovalsList"
                        title="My Approvals"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            'AdminOnly',
                        ])"
                        target-id="payrollRecord"
                        title="Payroll Record"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            'AdminOnly',
                        ])"
                        target-id="generatePayslip"
                        title="Generate Payslip"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_form,
                        ])"
                        id="payrollForm"
                    >
                        <HrmsPayrollSalaryGeneratePayrollGenerateForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_allrequests,
                        ])"
                        id="allRequest"
                    >
                        <HrmsPayrollSalaryGeneratePayrollAllRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_form,
                        ])"
                        id="myRequestList"
                    >
                        <HrmsPayrollSalaryGeneratePayrollMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_payroll_salary_generatepayroll_myapprovals,
                        ])"
                        id="myApprovalsList"
                    >
                        <HrmsPayrollSalaryGeneratePayrollMyApprovals />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        v-if="useCheckAccessibility([
                            'AdminOnly',
                        ])"
                        id="payrollRecord"
                    >
                        <HrmsPayrollPayrollrecordTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer
                        v-if="useCheckAccessibility([
                            'AdminOnly',
                        ])"
                        id="generatePayslip"
                    >
                        <HrmsPayrollGeneratePayslip />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
