<script setup lang="ts">
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"
const dataStore = use13thMonthStore()
useHead({
    title: "Payroll Summary Details",
})
const compId = useId()
const isLoading = ref(false)
const route = useRoute()
const requestDetailsData = ref()
const snackbar = useSnackbar()
onMounted(async () => {
    if (route.query.id) {
        isLoading.value = true
        requestDetailsData.value = await dataStore.getOne(route.query.id)
        isLoading.value = false
    }
})
const approvedRequest = async (id: any) => {
    try {
        await dataStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: "Successfully Approved."
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
const denyRemarks = ref("")
const denyRequest = async (id : any) => {
    try {
        await dataStore.denyApprovalForm(id, denyRemarks.value)
        snackbar.add({
            type: "success",
            text: "Successfully Denied"
        })
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    }
}
</script>
<template>
    <LayoutAcessContainer
        :if-access="useCheckAccessibility([
            AccessibilityTypes.hrms_payroll_salarydisbursement_viewpayslips,
        ])"
        :comp-id="compId"
        class="min-h-40"
    >
        <LayoutBoards title="13th Month Request Details" :is-loading="isLoading">
            <LayoutBackOrHome v-if="!route.query.id" message="Please select a 13th Month Request" />
            <template v-if="requestDetailsData?.data">
                <HrmsPayroll13thMonthRequestDetails
                    :data="requestDetailsData?.data"
                />
                <LayoutApprovalsListView :approvals="requestDetailsData?.data.approvals" :signature-view="false" />
                <div v-if="useCheckIsCurrentUser(requestDetailsData?.data.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
                    <HrmsCommonApprovalDenyButton
                        v-model:deny-remarks="denyRemarks"
                        :request-id="requestDetailsData?.data.id"
                        @approve="approvedRequest"
                        @deny="denyRequest"
                    />
                </div>
            </template>
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
