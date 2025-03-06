<script setup>
useHead({
    title: "Personal Action Notice",
})
const compId = useId()
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_pan_group,
        ])"
    >
        <div class="w-full">
            <div class="flex flex-col md:flex-row gap-4">
                <div class="w-full">
                    <HrmsCommonTabsMainContainer>
                        <template #tab-titles>
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.HRMS_EMPLOYEE_PAN_FORM_GROUP,
                                ])"
                                title="Form"
                                :target-id="'pantab0' + compId"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_all_request,
                                ])"
                                title="All List"
                                :target-id="'pantab1' + compId"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.HRMS_EMPLOYEE_PAN_FORM_GROUP,
                                ])"
                                title="My Requests"
                                :target-id="'pantab2' + compId"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_approval,
                                ])"
                                title="My Approvals"
                                :target-id="'pantab3' + compId"
                            />
                        </template>
                        <template #tab-containers>
                            <HrmsCommonTabsTabContainer :id="'pantab0' + compId">
                                <HrmsEmployeePanPersonelActionForm />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer :id="'pantab1' + compId">
                                <HrmsEmployeePanAllPanList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer :id="'pantab2' + compId">
                                <HrmsEmployeePanMyPanList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer :id="'pantab3' + compId">
                                <HrmsEmployeePanApprovalList />
                            </HrmsCommonTabsTabContainer>
                        </template>
                    </HrmsCommonTabsMainContainer>
                </div>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
