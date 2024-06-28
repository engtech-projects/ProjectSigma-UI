<script setup>
import { useEnumsStore } from "@/stores/hrms/enum"
const enums = useEnumsStore()
enums.getSalarygradeEnums()
enums.getDepartmentEnums()
enums.getPositionEnums()
enums.getEmployeeEnum()
enums.getUserEmployeeEnums()
useHead({
    title: "Personal Action Notice",
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_pan_group,
        ])"
    >
        <div class="w-full">
            <div class="md:flex gap-4">
                <HrmsEmployeePanPersonelActionForm
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_pan_form,
                    ])"
                />
                <div class="w-2/3">
                    <HrmsCommonTabsMainContainer>
                        <template #tab-titles>
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_all_request,
                                ])"
                                title="All List"
                                target-id="allListPAN"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_my_request,
                                ])"
                                title="My Requests"
                                target-id="myRequestsPAN"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_pan_approval,
                                ])"
                                title="My Approvals"
                                target-id="myApprovalsPAN"
                            />
                        </template>
                        <template #tab-containers>
                            <HrmsCommonTabsTabContainer id="allListPAN">
                                <HrmsEmployeePanAllPanList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer id="myRequestsPAN">
                                <HrmsEmployeePanMyPanList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer id="myApprovalsPAN">
                                <HrmsEmployeePanApprovalList />
                            </HrmsCommonTabsTabContainer>
                        </template>
                    </HrmsCommonTabsMainContainer>
                </div>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
