<script setup>
import { storeToRefs } from "pinia"
import { useOvertimeStore } from "@/stores/hrms/overtime"

defineProps({
    data: {
        type: Object,
        required: true,
    },
})

const { data: userData } = useAuth()
const showModal = defineModel("showModal", { required: false, type: Boolean })

const overtimes = useOvertimeStore()
const { remarks } = storeToRefs(overtimes)

const snackbar = useSnackbar()
const boardLoading = ref(false)

const closeViewModal = () => {
    showModal.value = false
}
const approvedRequest = async (id) => {
    try {
        boardLoading.value = true
        await overtimes.approveApprovalForm(id)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
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
        await overtimes.denyApprovalForm(id)
        snackbar.add({
            type: "success",
            text: overtimes.successMessage
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

const headers = [
    { name: "Employee Name", id: "fullname_first" },
]

</script>
<template>
    <PsModal v-model:show-modal="showModal" :is-loading="boardLoading" title="">
        <template #body>
            <div class="grid gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-gray-900 text-4xl">Overtime</span>
                </div>
            </div>
            <div class="grid md:grid-cols-3 gap-2 md:justify-between">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Charged to: </span> <span class="text-gray-900">{{ data.charging_name }}</span>
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light">Date of Overtime: </span> {{ data.overtime_date }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> From: </span> {{ data.start_time_human }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> To: </span> {{ data.end_time_human }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Meal Deduction: </span> {{ data.meal_deduction ? "Yes" : "No" }}
                </div>
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Purpose/Reason: </span> {{ data.reason }}
                </div>
            </div>
            <div class="w-full">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Employees: </span>
                </div>
                <LayoutPsTable
                    class="max-h-[180px] overflow-auto"
                    :header-columns="headers"
                    :datas="data.employees"
                    :actions="actions"
                />
            </div>
            <div class="w-full">
                <div class="p-2 flex gap-2">
                    <span class="text-teal-600 text-light"> Prepared by: </span> {{ data.prepared_by.name }}
                </div>
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
                />
            </div>
        </template>
    </PsModal>
</template>
