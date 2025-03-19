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
                            AccessibilityTypes.hrms_employee_manpower_request_form_and_my_requests,
                        ])"
                        title="Request Form"
                        target-id="requestForm"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpower_request_form_and_my_requests,
                        ])"
                        title="My Requests"
                        target-id="myRequestsManpower"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                        ])"
                        title="All Requests"
                        target-id="allRequestsManpower"
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
                            AccessibilityTypes.hrms_employee_manpower_request_open_positions,
                        ])"
                        title="Open Positions"
                        target-id="openPositions"
                    />
                    <HrmsCommonTabsTabTitle
                        v-if="useCheckAccessibility([
                            AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                        ])"
                        title="Approved Positions"
                        target-id="approvedPositions"
                    />
                </template>
                <template #tab-containers>
                    <HrmsCommonTabsTabContainer id="requestForm">
                        <HrmsEmployeeManpowerAddRequest
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_employee_manpower_request_form_and_my_requests,
                            ])"
                            v-show="!isEdit"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myRequestsManpower">
                        <HrmsEmployeeManpowerMyRequests
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_employee_manpower_request_form_and_my_requests,
                            ])"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="allRequestsManpower">
                        <HrmsEmployeeManpowerMonitoringList
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                            ])"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="myApprovalsManpower">
                        <HrmsEmployeeManpowerMyApprovals
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_employee_manpowerrequest_approval,
                            ])"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="openPositions">
                        <HrmsEmployeeManpowerOpenPositionList
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_employee_manpower_request_open_positions,
                            ])"
                        />
                    </HrmsCommonTabsTabContainer>
                    <HrmsCommonTabsTabContainer id="approvedPositions">
                        <HrmsEmployeeManpowerFilledPositionList
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_employee_manpowerrequest_all_request,
                            ])"
                        />
                    </HrmsCommonTabsTabContainer>
                </template>
            </HrmsCommonTabsMainContainer>
        </div>
    </LayoutAcessContainer>
</template>
