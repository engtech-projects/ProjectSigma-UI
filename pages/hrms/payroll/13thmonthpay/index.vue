<script setup lang="ts">
const compId = useId()
useHead({
    title: "13th Month Pay",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.HRMS_PAYROLL_13THMONTH_GROUP,
        ])"
    >
        <div class="grid grid-cols-1 md:flex-row gap-4">
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_13THMONTH_FORMANDMYREQUEST,
                        ])"
                        :target-id="'tab1' + compId"
                        title="Generate 13th Month Pays"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_13THMONTH_ALLREQUESTS,
                        ])"
                        :target-id="'tab2' + compId"
                        title="All Requests"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_13THMONTH_ALLREQUESTS,
                        ])"
                        :target-id="'tab3' + compId"
                        title="My Requests"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.HRMS_PAYROLL_13THMONTH_MYAPPROVALS,
                        ])"
                        :target-id="'tab4' + compId"
                        title="My Approvals"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer :id="'tab1' + compId">
                        <HrmsPayroll13thMonth13thmonthForm />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab2' + compId">
                        <HrmsPayroll13thMonthAllRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab3' + compId">
                        <HrmsPayroll13thMonthMyRequests />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer :id="'tab4' + compId">
                        <HrmsPayroll13thMonthMyApprovals />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
