<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
import { useEnumsStore } from "@/stores/hrms/enum"

const genpayrollstore = useGeneratePayrollStore()
genpayrollstore.getAllList()
genpayrollstore.getMyApprovalRequests()
genpayrollstore.getMyRequests()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getDepartmentEnums()
enums.getProjectEnums()

useHead({
    title: "Generate Payroll",
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
                    <HrmsCommonTabsTabTitle target-id="payrollForm" title="Generate Payroll" />
                    <HrmsCommonTabsTabTitle target-id="allRequest" title="All Request" />
                    <HrmsCommonTabsTabTitle target-id="myRequestList" title="My Request" />
                    <HrmsCommonTabsTabTitle target-id="myApprovalsList" title="My Approvals" />
                    <HrmsCommonTabsTabTitle target-id="payrollRecord" title="Payroll Record" />
                    <HrmsCommonTabsTabTitle target-id="generatePayslip" title="Generate Payslip" />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="payrollForm">
                        <HrmsPayrollGeneratepayrollForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allRequest">
                        <HrmsPayrollAllRequest />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myRequestList">
                        <HrmsPayrollMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovalsList">
                        <HrmsPayrollMyApprovals />
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
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <!-- <HrmsPayrollGeneratepayrollForm /> -->
            <!-- <HrmsPayrollGeneratepayrollTable /> -->
        </div>
    </LayoutAcessContainer>
</template>
