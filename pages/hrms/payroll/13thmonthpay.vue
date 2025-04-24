<script  setup lang="ts">
const compId = useId()
useHead({
    title: "13th Month Pay",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_13thmonth,
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle :target-id="'tab1' + compId" title="Generate 13th Month Pays" />
                    <HrmsCommonTabsTabTitle :target-id="'tab2' + compId" title="All Requests" />
                    <HrmsCommonTabsTabTitle :target-id="'tab3' + compId" title="My Requests" />
                    <HrmsCommonTabsTabTitle :target-id="'tab4' + compId" title="My Approvals" />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer :id="'tab1' + compId">
                        <HrmsPayroll13thMonth13thmonthTable />
                        <HrmsPayroll13thMonth13thmonthForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab2' + compId">
                        <HrmsPayrollAllowanceAllRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab3' + compId">
                        <HrmsPayrollAllowanceMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab4' + compId">
                        <HrmsPayrollAllowanceMyApprovals />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
