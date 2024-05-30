<script setup lang="ts">
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
import { useEnumsStore } from "@/stores/hrms/enum"

const genallowances = useGenerateAllowanceStore()
// const { isEdit } = storeToRefs(stores)
genallowances.getMyRequests()
genallowances.getMyApprovalRequests()
genallowances.getGA()

const enums = useEnumsStore()
enums.getEmployeeEnum()
enums.getDepartmentEnums()
enums.getProjectEnums()

useHead({
    title: "Generate Allowance"

})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_allowance,
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle target-id="generateallowance" title="Generate Allowance" />
                    <HrmsCommonTabsTabTitle target-id="allowance-records" title="Allowance Records" />
                    <HrmsCommonTabsTabTitle target-id="myRequestList" title="My Request" />
                    <HrmsCommonTabsTabTitle target-id="myApprovalsList" title="My Approvals" />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="generateallowance">
                        <HrmsPayrollAllowanceForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allowance-records">
                        <HrmsPayrollAllowanceTable />
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
