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
                <HrmsEmployeePanPersonelActionForm
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_pan_form,
                    ])"
                />
                <div class="w-full md:w-2/3">
                    <HrmsCommonTabsMainContainer>
                        <template #tab-titles>
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_all_request,
                                ])"
                                title="All List"
                                :target-id="compId + '1'"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_my_request,
                                ])"
                                title="My Requests"
                                :target-id="compId + '2'"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_approval,
                                ])"
                                title="My Approvals"
                                :target-id="compId + '3'"
                            />
                        </template>
                        <template #tab-containers>
                            <HrmsCommonTabsTabContainer :id="compId + '1'">
                                <HrmsEmployeePanAllPanList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer :id="compId + '2'">
                                <HrmsEmployeePanMyPanList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer :id="compId + '3'">
                                <HrmsEmployeePanApprovalList />
                            </HrmsCommonTabsTabContainer>
                        </template>
                    </HrmsCommonTabsMainContainer>
                </div>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
