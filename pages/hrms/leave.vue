<script setup>
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useEnumsStore } from "@/stores/hrms/enum"
import { useNotificationsStore } from "@/stores/notifications"

const notifStore = useNotificationsStore()
const leaveRequest = useLeaveRequest()
leaveRequest.allLeaves()
leaveRequest.allApprovals()
leaveRequest.myRequest()

const enums = useEnumsStore()
enums.getDepartmentEnums()
const showOnloadModal = ref(false)
if (useRoute().query.id) {
    await leaveRequest.getOne(useRoute().query.id)
    showOnloadModal.value = true
    if ((useRoute().query.type || "") !== "Approve") {
        notifStore.setSingleNotifAsRead(useRoute().query.notifId)
    }
}
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
            AccessibilityTypes.hrms_lnotnto_leave_group,
        ])"
    >
        <div
            class="w-full flex flex-col md:flex-row gap-2"
        >
            <HrmsLeaveInfoModal
                v-model:showModal="showOnloadModal"
                :data="leaveRequest.payload"
            />
            <div class="w-full">
                <HrmsLeaveForm
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_leave_form,
                    ])"
                />
            </div>
            <div class="w-full">
                <HrmsCommonTabsMainContainer>
                    <template #tab-titles>
                        <HrmsCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_lnotnto_leave_list,
                            ])"
                            target-id="leaverequest-all-list"
                            title="All List"
                        />
                        <HrmsCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_lnotnto_leave_my_request,
                            ])"
                            target-id="leaverequest-my-request"
                            title="My Request"
                        />
                        <HrmsCommonTabsTabTitle
                            v-if="useCheckAccessibility([
                                AccessibilityTypes.hrms_lnotnto_leave_my_approvals,
                            ])"
                            target-id="leaverequest-my-approvals"
                            title="My Approvals"
                        />
                    </template>
                    <template #tab-containers>
                        <HrmsCommonTabsTabContainer id="leaverequest-all-list">
                            <HrmsLeaveAllList />
                        </HrmsCommonTabsTabContainer>
                        <HrmsCommonTabsTabContainer id="leaverequest-my-request">
                            <HrmsLeaveMyRequests />
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
