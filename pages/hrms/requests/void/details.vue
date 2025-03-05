<script setup lang="ts">
import { useVoidStore } from "~/stores/hrms/requests/void"
useHead({
    title: "Void Request Details",
})
const voidStore = useVoidStore()
const compId = useId()
const isLoading = ref(false)
const route = useRoute()
const voidRequest = ref()
const snackbar = useSnackbar()
onMounted(async () => {
    if (route.query.id) {
        isLoading.value = true
        voidRequest.value = await voidStore.getOne(route.query.id)
        isLoading.value = false
    }
})
const approvedRequest = async (id: any) => {
    try {
        isLoading.value = true
        await voidStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: "Successfully Approved."
        })
        voidRequest.value = await voidStore.getOne(route.query.id)
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        isLoading.value = false
    }
}
const denyRemarks = ref("")
const denyRequest = async (id : any) => {
    try {
        await voidStore.denyApprovalForm(id, denyRemarks.value)
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
            AccessibilityTypes.HRMS_REQUEST_VOID_GROUP,
        ])"
        :comp-id="compId"
        class="min-h-40 flex flex-col gap-2"
    >
        <LayoutBoards title="Void Request Details" :is-loading="isLoading">
            <LayoutBackOrHome v-if="!route.query.id" message="Please select a Void Request" />
            <template v-if="voidRequest?.data">
                <div class="grid md:grid-cols-2 gap-2 md:justify-between">
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light font-medium">Request Type: </span> <span class="text-gray-900">{{ voidRequest?.data.void_type }}</span>
                    </div>
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light font-medium">Payroll Type: </span> {{ voidRequest?.data.reason_for_void }}
                    </div>
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light font-medium">Requested By: </span>
                        {{ voidRequest?.data.created_by_user_name }}<br>{{ voidRequest?.data.created_at_human }}
                    </div>
                    <div class="p-2 flex gap-2">
                        <span class="text-teal-600 text-light font-medium">Request Status: </span> {{ voidRequest?.data.request_status }}
                    </div>
                </div>
                <LayoutApprovalsListView :approvals="voidRequest.data.approvals" :is-approved="voidRequest.data.request_status?.toLowerCase() === 'approved'" />
                <div v-if="voidRequest.data.next_approval && useCheckIsCurrentUser(voidRequest.data.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
                    <HrmsCommonApprovalDenyButton
                        v-model:deny-remarks="denyRemarks"
                        :request-id="voidRequest?.data.id"
                        @approve="approvedRequest"
                        @deny="denyRequest"
                    />
                </div>
            </template>
        </LayoutBoards>
        <LayoutBoards title="Attached Request">
            <HrmsLeaveRequestInformation
                v-if="voidRequest.data.void_type === 'RequestLeaves'"
                :leave-data="voidRequest.data.request"
            />
        </LayoutBoards>
    </LayoutAcessContainer>
</template>
