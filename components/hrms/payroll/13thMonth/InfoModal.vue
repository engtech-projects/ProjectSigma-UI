<script setup lang="ts">
import { use13thMonthStore } from "@/stores/hrms/payroll/13thmonth"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const showModal = defineModel("showModal", { required: false, type: Boolean })

const resourceStore = use13thMonthStore()

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id: any) => {
    try {
        boardLoading.value = true
        await resourceStore.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: "Successfully Approved."
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}
const denyRemarks = ref("")
const denyRequest = async (id : any) => {
    try {
        boardLoading.value = true
        await resourceStore.denyApprovalForm(id, denyRemarks.value)
        snackbar.add({
            type: "success",
            text: "Successfully Denied"
        })
        closeViewModal()
    } catch (error) {
        snackbar.add({
            type: "error",
            text: error || "something went wrong."
        })
    } finally {
        boardLoading.value = false
    }
}

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Salary Disbursement Request">
        <template #body>
            <HrmsPayroll13thMonthRequestDetails
                :data="data"
            />
            <LayoutApprovalsListView :approvals="data.approvals" :signature-view="false" />
        </template>
        <template #footer>
            <div v-if="useCheckIsCurrentUser(data.next_approval?.user_id)" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="denyRemarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </template>
    </PsModal>
</template>
