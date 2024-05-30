<script setup lang="ts">
import { useGeneratePayrollStore } from "@/stores/hrms/payroll/generatePayroll"
import { useEnumsStore } from "@/stores/hrms/enum"

const genpayrollstore = useGeneratePayrollStore()
// genpayrollstore.getAllList()
genpayrollstore.getMyApprovalRequests()
genpayrollstore.getMyRequests()
// const { isEdit } = storeToRefs(stores)
// genpayrollstore.generatePayroll()
// genpayrollstore.createRequest()

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
                    <HrmsCommonTabsTabTitle target-id="payrollForm" title="Generate Payroll Form" />
                    <HrmsCommonTabsTabTitle target-id="payrollView" title="Payroll View" />
                    <HrmsCommonTabsTabTitle target-id="myRequestList" title="My Request" />
                    <HrmsCommonTabsTabTitle target-id="myApprovalsList" title="My Approvals" />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="payrollForm">
                        <HrmsPayrollGeneratepayrollForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="payrollView">
                        <HrmsPayrollView />
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
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <!-- <HrmsPayrollGeneratepayrollForm /> -->
            <!-- <HrmsPayrollGeneratepayrollTable /> -->
        </div>
    </LayoutAcessContainer>
</template>
