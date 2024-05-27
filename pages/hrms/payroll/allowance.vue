<script setup lang="ts">
import { useGenerateAllowanceStore } from "@/stores/hrms/payroll/generateAllowance"
import { useEnumsStore } from "@/stores/hrms/enum"

const genallowances = useGenerateAllowanceStore()
// const { isEdit } = storeToRefs(stores)
// genallowstore.getMyRequests()
// genergenallowstoreateallowance.getMyApprovalRequests()
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
                    <HrmsCommonTabsTabTitle target-id="allowance-records" title="Allowance Records" />
                    <HrmsCommonTabsTabTitle target-id="generateallowance" title="Generate Allowance" />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="allowance-records">
                        <HrmsPayrollAllowanceTable />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="generateallowance">
                        <HrmsPayrollAllowanceForm />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
