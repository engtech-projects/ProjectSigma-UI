<script setup>
import { storeToRefs } from "pinia"
import { useManpowerStore } from "@/stores/hrms/employee/manpower"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})
const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const manpowers = useManpowerStore()
const { remarks } = storeToRefs(manpowers)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}

const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await manpowers.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: manpowers.successMessage
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

const denyRequest = async (id) => {
    try {
        boardLoading.value = true
        await manpowers.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: manpowers.successMessage
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
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">Application Information</span>
                </div>
            </div>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">POSITION {{ data.position.name }}</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Requested Date: </span> <span class="text-gray-900">{{ data.date_requested }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Requested Required Date: </span> {{ data.date_required }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> employment_type </span> {{ data.employment_type }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> brief_description </span> {{ data.brief_description }}
                </div>
                <!-- <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> job_description_attachment </span> {{ data.job_description_attachment }}
                </div> -->
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> nature_of_request </span> {{ data.nature_of_request }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> age_range </span> {{ data.age_range }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> status </span> {{ data.status }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> gender </span> {{ data.gender }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> educational_requirement </span> {{ data.educational_requirement }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> preferred_qualifications </span> {{ data.preferred_qualifications }}
                </div>
                <!-- <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> approvals </span> {{ data.approvals }}
                </div> -->
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> remarks </span> {{ data.remarks }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> request_status </span> {{ data.request_status }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> charged_to </span> {{ data.charged_to }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> breakdown_details </span> {{ data.breakdown_details }}
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                    @clear="clearRemarks"
                />
            </div>
        </template>
    </PsModal>
</template>
