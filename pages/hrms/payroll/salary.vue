<script setup lang="ts">
useHead({
    title: "Salary",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_generate_payroll,
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
                        target-id="payrollRecord"
                        title="Payroll Record"
                    />
                    <HrmsCommonTabsTabTitle
                        target-id="generatePayslip"
                        title="Generate Payslip"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="payrollForm">
                        <HrmsPayrollSalaryGeneratePayrollGenerateForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allRequest">
                        <HrmsPayrollSalaryGeneratePayrollAllRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myRequestList">
                        <HrmsPayrollSalaryGeneratePayrollMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovalsList">
                        <HrmsPayrollSalaryGeneratePayrollMyApprovals />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="payrollRecord">
                        <HrmsPayrollPayrollrecordTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="generatePayslip">
                        <HrmsPayrollGeneratePayslip />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
