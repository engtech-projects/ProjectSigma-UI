<script setup>
import { usePersonelActionNotice } from "@/stores/hrms/pan"
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

const pan = usePersonelActionNotice()
pan.fetchPersonelActionList()
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_personnel_action_notice_form,
            AccessibilityTypes.hrms_employee_personnel_action_notice_all_request,
            AccessibilityTypes.hrms_employee_personnel_action_notice_approval,
            AccessibilityTypes.hrms_employee_personnel_action_notice_my_request,
        ])"
    >
        <div class="w-full">
            <div class="text-2xl font-normal mb-4 mt-10 md:mt-0">
                Personnel Action Form
            </div>
            <hr>
            <div class="md:flex gap-4">
                <HrmsEmployeePanPersonelActionForm
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_employee_personnel_action_notice_form,
                    ])"
                />
                <div class="w-2/3">
                    <HrmsCommonTabsMainContainer>
                        <template #tab-titles>
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_personnel_action_notice_all_request,
                                ])"
                                title="All List"
                                target-id="allListPAN"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_personnel_action_notice_approval,
                                ])"
                                title="My Releases"
                                target-id="myReleasesPAN"
                            />
                            <HrmsCommonTabsTabTitle
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_personnel_action_notice_my_request,
                                ])"
                                title="My Approvals"
                                target-id="myApprovalsPAN"
                            />
                        </template>
                        <template #tab-containers>
                            <HrmsCommonTabsTabContainer
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_personnel_action_notice_all_request,
                                ])"
                                id="allListPAN"
                            >
                                <HrmsEmployeePanAllPanList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_personnel_action_notice_approval,
                                ])"
                                id="myReleasesPAN"
                            >
                                <HrmsEmployeePanApprovalList />
                            </HrmsCommonTabsTabContainer>
                            <HrmsCommonTabsTabContainer
                                v-if="useCheckAccessibility([
                                    AccessibilityTypes.hrms_employee_personnel_action_notice_my_request,
                                ])"
                                id="myApprovalsPAN"
                            >
                                <HrmsEmployeePanMyPanList />
                            </HrmsCommonTabsTabContainer>
                        </template>
                    </HrmsCommonTabsMainContainer>
                </div>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
