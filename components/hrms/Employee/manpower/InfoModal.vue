<script setup>
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
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="Manpower Request">
        <template #body>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Requesting Department </span> {{ data.requesting_department_name }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Date Requested: </span> <span class="text-gray-900">{{ data.date_requested }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Date Required: </span> {{ data.date_required }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Position: </span> {{ data.position.name }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Employment Type: </span> {{ data.employment_type }}
                </div>
                <br>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Brief Description: </span> {{ data.brief_description }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Job Description: </span>
                    <span class="truncate hover:cursor-pointer text-blue-500 italic">
                        <a target="_blank" :href="useHrmsDownloadLink(data.job_description_attachment)">
                            <Icon
                                name="mage:file-download-fill"
                                class="h-5 w-5 lg:h-5 lg:w-5"
                            />
                            Download
                        </a>
                    </span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Nature of Request: </span> {{ data.nature_of_request }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Age Range: </span> {{ data.age_range }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Status: </span> {{ data.status }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Gender: </span> {{ data.gender }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Educational Requirements: </span> {{ data.educational_requirement }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Preferred Qualifications: </span> {{ data.preferred_qualifications }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Remarks: </span> {{ data.remarks }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Requested By: </span> {{ data.requested_by_user_name }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Request Status: </span> {{ data.request_status }}
                </div>
            </div>
            <div class="w-full">
                <LayoutApprovalsListView :approvals="data.approvals" />
            </div>
        </template>
        <template #footer>
            <div v-if="data.next_approval?.user_id === userData?.id" class="flex gap-2 p-2 justify-end relative">
                <HrmsCommonApprovalDenyButton
                    v-model:deny-remarks="remarks"
                    :request-id="data.id"
                    @approve="approvedRequest"
                    @deny="denyRequest"
                />
            </div>
        </template>
    </PsModal>
</template>
