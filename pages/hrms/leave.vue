<script setup>
import { useLeaveRequest } from "@/stores/hrms/leaveRequest"
import { useNotificationsStore } from "@/stores/notifications"

const notifStore = useNotificationsStore()
const leaveRequest = useLeaveRequest()
const showOnloadModal = ref(false)
const modalData = ref(null)
if (useRoute().query.id) {
    const reqData = await leaveRequest.getOne(useRoute().query.id)
    modalData.value = reqData.data
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
        <HrmsLeaveInfoModal
            v-model:showModal="showOnloadModal"
            :data="modalData"
        />
        <HrmsCommonTabsMainContainer>
            <template #tab-titles>
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_leave_form,
                    ])"
                    target-id="leaverequest-form"
                    title="Request Form"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_leave_list,
                    ])"
                    target-id="leaverequest-all-list"
                    title="All List"
                />
                <HrmsCommonTabsTabTitle
                    v-if="useCheckAccessibility([
                        AccessibilityTypes.hrms_lnotnto_leave_form,
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
                <HrmsCommonTabsTabContainer id="leaverequest-form">
                    <HrmsLeaveForm />
                </HrmsCommonTabsTabContainer>
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
    </LayoutAcessContainer>
</template>
