<script setup lang="ts">
import { useFailToLogStore } from "@/stores/hrms/attendance/failtolog"
import { useEnumsStore } from "@/stores/hrms/enum"

const failtologstore = useFailToLogStore()
failtologstore.getAllList()
failtologstore.getMyApprovalRequests()
failtologstore.getMyRequests()

const enums = useEnumsStore()
enums.getEmployeeEnum()
// enums.getDepartmentEnums()
// enums.getProjectEnums()

useHead({
    title: "Failure To Log",
    meta: [
        { name: "description", content: "" }
    ],
})

</script>

<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_attendance_failure_to_log,
        ])"
    >
        <div class="md:flex gap-2">
            <HrmsAttendanceFailtologFormLog class="md:w-1/2" />
            <div class="md:w-1/2 p-2 w-full">
                <HrmsCommonTabsMainContainer>
                    <template #tab-titles>
                        <HrmsCommonTabsTabTitle target-id="allList" title="All List" />
                        <HrmsCommonTabsTabTitle target-id="myRequestList" title="My Request" />
                        <HrmsCommonTabsTabTitle target-id="myApprovalsList" title="My Approvals" />
                    </template>
                    <template #tab-containers>
                        <HrmsCommonTabsTabContainer id="allList">
                            <HrmsAttendanceFailtologAllList />
                        </HrmsCommonTabsTabContainer>
                        <HrmsCommonTabsTabContainer id="myRequestList">
                            <HrmsAttendanceFailtologMyRequests />
                        </HrmsCommonTabsTabContainer>
                        <HrmsCommonTabsTabContainer id="myApprovalsList">
                            <HrmsAttendanceFailtologMyApprovals />
                        </HrmsCommonTabsTabContainer>
                    </template>
                </HrmsCommonTabsMainContainer>
            </div>
        </div>
    </LayoutAcessContainer>
</template>
