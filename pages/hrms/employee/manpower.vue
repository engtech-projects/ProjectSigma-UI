<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"

const manpowers = useManpowerStore()
const { isEdit } = storeToRefs(manpowers)
useHead({
    title: "Manpower Request",
})
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_employee_manpowerrequest_group,
        ])"
    >
        <div class="grid grid-cols-1 gap-4">
            <!-- <EmployeeManpowerEditRequest v-show="isEdit" /> -->
            <HrmsCommonTabsMainContainer>
                <template #tab-titles>
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                        ])"
                        title="Form"
                        target-id="formManpower"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                        ])"
                        title="Open Positions"
                        target-id="openPositions"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                        ])"
                        title="Filled Positions"
                        target-id="filledPositions"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                        ])"
                        title="On Hold Positions"
                        target-id="onHoldPositions"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                        ])"
                        title="All List"
                        target-id="allListManpower"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_approval,
                        ])"
                        title="My Approvals"
                        target-id="myApprovalsManpower"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_my_request,
                        ])"
                        title="My Request"
                        target-id="myRequestsManpower"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="formManpower">
                        <HrmsEmployeeManpowerAddRequest
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_employee_manpowerrequest_form,
                            ])"
                            v-show="!isEdit"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="openPositions">
                        <HrmsEmployeeManpowerOpenPositionList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="onHoldPositions">
                        <HrmsEmployeeManpowerOnHoldPositionList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="filledPositions">
                        <HrmsEmployeeManpowerFilledPositionList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allListManpower">
                        <HrmsEmployeeManpowerMonitoringList />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovalsManpower">
                        <HrmsEmployeeManpowerMyApprovals />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myRequestsManpower">
                        <HrmsEmployeeManpowerMyRequests />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
