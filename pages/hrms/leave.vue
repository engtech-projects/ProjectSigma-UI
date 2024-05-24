<script setup>
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useEnumsStore } from "@/stores/hrms/enum"

const leaveRequest = useLeaveRequest()
leaveRequest.allLeaves()
leaveRequest.allApprovals()

const enums = useEnumsStore()
enums.getDepartmentEnums()

useHead({
    title: "Leave",
    meta: [
        { name: "description", content: "" }
    ],
})
</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_announcement,
        ])"
    >
        <div
            class="w-full flex p-2"
        >
            <div class="md:w-1/2 p-2 w-full">
                <HrmsLeaveForm />
            </div>
            <div class="md:w-1/2 p-2 w-full">
                <HrmsCommonTabsMainContainer>
                    <template #tab-titles>
                        <HrmsCommonTabsTabTitle target-id="leaverequest-all-list" title="All List" />
                        <HrmsCommonTabsTabTitle target-id="leaverequest-my-approvals" title="My Approvals" />
                    </template>
                    <template #tab-containers>
                        <HrmsCommonTabsTabContainer id="leaverequest-all-list">
                            <HrmsLeaveAllList />
                        </HrmsCommonTabsTabContainer>
                        <HrmsCommonTabsTabContainer id="leaverequest-my-approvals">
                            <HrmsLeaveApprovalList />
                        </HrmsCommonTabsTabContainer>
                    </template>
                </HrmsCommonTabsMainContainer>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
